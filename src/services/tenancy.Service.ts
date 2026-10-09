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
        // Create contract
        await contractService.createContract(createdTenancy.id)
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
        .addSelect(["user.firstName", "user.lastName", "unit.rent", "unit.unitKey", "property.propertyName"])
        .getMany());

      const response: FetchTenanciesResponse[] = tenancies.map((tenancy) => {
        let formattedTenancy: FetchTenanciesResponse = {
          id: tenancy.id,
          tenantId: tenancy.tenantId,
          buildingId: tenancy.buildingId,
          unitId: tenancy.id,
          rent: tenancy.unit.rent,
          firstName: tenancy.tenant.firstName,
          lastName: tenancy.tenant.lastName,
          unitKey: tenancy.unit.unitKey,
          propertyName: tenancy.building.propertyName
        };

        return formattedTenancy;
      });
      return { success: true, message: "Success.", data: tenancies };
    } catch (error) {
      logger.error(error);
      return {
        success: false,
        message: "An unknown error occurred while fetching tenancies",
        data: null,
      };
    }
  }

  public async endTenancy(tenancyId: string, endDate?: Date): Promise<BaseResponse> {
    try {
      // Check whether tenancy exists
      const tenancy = await Tenancies.findOne({ where: { id: tenancyId } })
      if (!tenancy) {
        return { success: false, message: "Tenancy not found!", data: null }
      }

      // End contract
      await contractService.endContract(tenancyId, endDate)

      // Remove tenancy
      await Tenancies
        .createQueryBuilder()
        .softDelete()
        .where("id = :id", { id: tenancyId })
        .execute();

      // Set the tenant id to null in the units table
      await Unit
        .createQueryBuilder()
        .update(Unit)
        .set({ tenant: null })
        .where("id = :id", { id: tenancy.unitId })
        .execute()

      return { success: true, message: "Success!", data: null };
    } catch (error) {
      logger.error(error)
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

  // Check if unit has an active tenancy
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

      const isVacant = await Unit.query("SELECT * FROM units u INNER JOIN property p ON u.buildingId = p.id WHERE u.id = ?", [unitId])

      // Find unit's active tenancy
      if (isVacant?.tenantId == null) {
        return { unitId: isVacant.id, rent: isVacant.rent, manager: isVacant.propertyManager };
      }
      return { unitId: isVacant.id, rent: isVacant.rent, manager: isVacant.propertyManager };
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
    } catch (error) {
      logger.error(error)
      return { success: false }
    }
  }
}

export const tenancyService = new TenancyService();
