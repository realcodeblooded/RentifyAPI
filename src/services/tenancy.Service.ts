import { AppDataSource } from "@/config/database";
import { Tenancies, User } from "@/entities";
import { Unit } from "@/entities/units.Entity";
import { BaseContractDetails, PaymentFrequency } from "@/types/contract.Types";
import { BaseResponse } from "@/types/response.types";
import {
  BaseTenancyDetails,
  FetchTenanciesResponse,
  IsVacantResponse,
} from "@/types/tenancy.Types";
import { logger } from "@/utils/logger";
import { contractService } from "./contract.Service";
import { Property } from "@/entities/property.Entity";

class TenancyService {
  public async createTenancy(
    tenancy: BaseTenancyDetails,
  ): Promise<BaseResponse> {
    // Check if the tenant is still an active tenant in another unit
    const hasActiveTenancy = await this.tenantHasActiveTenancy(
      tenancy.tenantId,
    );
    if (hasActiveTenancy) {
      // ✅ Flipped
      return {
        success: false,
        message: "Cannot create new tenancy, end your current tenancy first",
        data: null,
      };
    }

    // Check if the unit  they are vacating to is vacant
    const upForTenancy = await this.isVacant(
      tenancy.unitId,
      tenancy.buildingId,
    );
    if (!upForTenancy) {
      return {
        success: false,
        message: "Unit not found or has an active tenant",
        data: null,
      };
    }

    try {
      await AppDataSource.transaction(async (manager) => {
        const newTenancy = manager.create(Tenancies, tenancy);

        const createdTenancy = await newTenancy.save();

        const occupy_unit = await this.occupyUnit(
          tenancy.buildingId,
          tenancy.unitId,
          tenancy.tenantId,
        );

        if (!occupy_unit.success) {
          return { success: false, message: occupy_unit.message, data: null };
        }

        const contractDetails: BaseContractDetails = {
          tenantId: tenancy.tenantId,
          rent: tenancy.rent ?? upForTenancy.rent, // ✅ ?? is safer than ||
          currency: tenancy.currency ?? "KSH",
          tenancyId: createdTenancy.id,
          managerId: tenancy.managerId,
          frequency: tenancy.frequency ?? PaymentFrequency.MONTHLY,
          gracePeriod: tenancy.gracePeriod ?? 5,
          startDate: tenancy.startDate,
          endDate: tenancy.endDate,
        };

        const createdContract =
          await contractService.createContract(contractDetails); // ✅ pass manager
        if (!createdContract.success)
          throw new Error("Could not create contract");
      });
      return {
        success: true,
        message: "Tenancy created successfully.",
        data: null,
      };
      // const tenancyRepository = AppDataSource.getRepository(Tenancies)
    } catch (error) {
      logger.error(error);
      return {
        success: false,
        message: "An unknown error occurred while creating tenancy.",
        data: null,
      };
    }
  }
  public async fetchTenancies(): Promise<BaseResponse> {
    try {
      const tenancies = (await Tenancies
        .getRepository()
        .createQueryBuilder("tenancy")
        .leftJoin("tenancy.tenant", "user")
        .leftJoin("tenancy.unit", "unit")
        .leftJoin("tenancy.building", "property")
        .leftJoin("property.propertyManager", "owner")
        .addSelect(["user.firstName", "user.lastName", "unit.rent", "owner.propertyOwner"])
        .getMany());

      console.log(tenancies);

      const response: FetchTenanciesResponse[] = tenancies.map((tenancy) => {
        let formattedTenancy: FetchTenanciesResponse = {
          id: tenancy.id,
          tenantId: tenancy.tenantId,
          buildingId: tenancy.buildingId,
          unitId: tenancy.id,
          rent: tenancy.unit.rent,
          managerId: tenancy.tenant.firstName,

          firstName: tenancy.tenant.firstName,
          lastName: tenancy.tenant.lastName,
          unitKey: tenancy.unit.unitKey,
        };
        console.log("Response", tenancy);

        return formattedTenancy;
      });
      return { success: true, message: "Success.", data: response };
    } catch (error) {
      console.log(error);
      logger.error(error);
      return {
        success: false,
        message: "An unknown error occurred while fetching tenancies",
        data: null,
      };
    }
  }

  public async endTenancy(tenancyId: string): Promise<BaseResponse> {
    try {
      return { success: true, message: "Success!", data: null };
    } catch (error) {
      return {
        success: false,
        message: "An unknown error occurred while ending tenancy",
        data: null,
      };
    }
  }

  public async tenantHasActiveTenancy(tenantId: string): Promise<boolean> {
    try {
      // Validate tenant id
      if (!tenantId || tenantId === "") return false;

      // Find user's active tenancy
      const hasActiveTenancy = await Tenancies.findOneBy({
        tenantId: tenantId,
      });

      // Tenant has an active tenancy return true
      return !!hasActiveTenancy;
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  public async isVacant(
    unitId: string,
    propertyId: string,
  ): Promise<IsVacantResponse | null> {
    try {
      // validate unit id
      if (!unitId || unitId === "" || !propertyId || propertyId === "") return null;

      // validate building id
      const property = await Property.findOne({ where: { id: propertyId } });

      if (!property) return null;

      const isVacant = await Unit.createQueryBuilder("unit")
        .leftJoinAndSelect("unit.tenant", "tenant")
        .where("unit.id = :unitId", { unitId })
        .andWhere(`unit.buildingId = :propertyId`, { propertyId })
        .getOne();


      // Find unit's active tenancy
      if (!isVacant?.tenant && isVacant) {
        console.log("Vacant Unit", isVacant);
        return { unitId: isVacant.id, rent: isVacant.rent, manager: property?.propertyManager.id };
      }
      return null;
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  public async occupyUnit(
    buildingId: string,
    unitId: string,
    tenantId: string,
  ): Promise<{ success: boolean; message?: string }> {
    try {
      // const tenant = await User.findOne({ where: { id: tenancy.tenantId } })

      // if (!tenant) throw new Error(`Tenant ${tenancy.tenantId} not found`);

      // await Unit.update({ id: tenancy.unitId }, { tenant: tenant });

      // validate unit id
      if (!unitId || unitId === "")
        return { success: false, message: "Invalid unit Id!" };

      // Check if unit exists
      const unit = await Unit.findOne({
        where: { id: unitId, buildingId: buildingId },
      });

      if (!unit) return { success: false, message: "Unit does not exist!" };

      // find tenant
      const tenant = await User.findOneBy({ id: tenantId });

      if (!tenant) return { success: false, message: "Tenant not found!" };

      if (!unit.tenant) {
        unit.tenant = tenant;
        await unit.save();
        return { success: true, message: "Tenant assigned to unit!" };
      }

      return { success: false };
    } catch (error) {
      logger.error(error);
      return { success: false };
    }
  }

  public async vacateUnit(buildingId: string, unitId: string) {
    try {
      const unit = await Unit.findOne({
        where: { id: unitId, buildingId: buildingId },
      });

      if (!unit) {
        return false;
      }

      unit.tenant = null;
      await unit.save();
      return true;
    } catch (error) { }
  }
}

export const tenancyService = new TenancyService();
