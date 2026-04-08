import { AppDataSource } from "@/config/database";
import { Tenancies, User } from "@/entities";
import { Unit } from "@/entities/units.Entity";
import { BaseContractDetails, PaymentFrequency } from "@/types/contract.Types";
import { BaseResponse } from "@/types/response.types";
import { BaseTenancyDetails, FetchTenanciesResponse, IsVacantResponse } from "@/types/tenancy.Types";
import { logger } from "@/utils/logger";
import { contractClass } from "./contract.Class";

class TenancyClass {
    public async createTenancy(tenancy: BaseTenancyDetails): Promise<BaseResponse> {

        // Check if the tenant is still an active tenant in another unit
        const hasActiveTenancy = await this.tenantHasActiveTenancy(tenancy.tenantId);
        if (hasActiveTenancy) {  // ✅ Flipped
            return { success: false, message: 'Cannot create new tenancy, end your current tenancy first', data: null };
        }

        // Check if the unit  they are vacting to is 
        const upForTenancy = await this.isVacant(tenancy.unitId, tenancy.buildingId);
        if (!upForTenancy) {
            return { success: false, message: 'Unit not found or has an active tenant', data: null };
        }

        try {
            await AppDataSource.transaction(async (manager) => {

                const newTenancy = manager.create(Tenancies, tenancy);

                const createdTenancy = await newTenancy.save();

                const occupy_unit = await this.occupyUnit(tenancy.buildingId, tenancy.unitId, tenancy.tenantId);

                if (!occupy_unit.success) { return { success: false, message: occupy_unit.message, data: null } }
                // const tenant = await User.findOne({ where: { id: tenancy.tenantId } })

                // if (!tenant) throw new Error(`Tenant ${tenancy.tenantId} not found`);

                // await Unit.update({ id: tenancy.unitId }, { tenant: tenant });

                const contractDetails: BaseContractDetails = {
                    tenantId: tenancy.tenantId,
                    rent: tenancy.rent ?? upForTenancy.rent,  // ✅ ?? is safer than ||
                    currency: tenancy.currency ?? 'KSH',
                    tenancyId: createdTenancy.id,
                    frequency: tenancy.frequency ?? PaymentFrequency.MONTHLY,
                    gracePeriod: tenancy.gracePeriod ?? 5,
                    startDate: tenancy.startDate,
                    endDate: tenancy.endDate,
                };

                const createdContract = await contractClass.createContract(contractDetails);  // ✅ pass manager
                if (!createdContract.success) throw new Error('Could not create contract');

            })
            return { success: true, message: 'Tenancy created successfully.', data: null };
            // const tenancyRepository = AppDataSource.getRepository(Tenancies)
        } catch (error) {
            logger.error(error);
            return { success: false, message: 'An unknown error occurred while creating tenancy.', data: null };
        }
    }
    public async fetchTenancies(): Promise<BaseResponse> {
        try {
            const tenancies = await Tenancies.find();

            const response: FetchTenanciesResponse[] = tenancies.map((tenancy) => {
                let formattedTenancy: FetchTenanciesResponse = {
                    id: tenancy.id,
                    tenantId: tenancy.tenantId,
                    buildingId: tenancy.unit.buildingId,
                    unitId: tenancy.unit.id,
                    rent: tenancy.unit.rent,
                    // currency: tenancy.currency. // Uncomment to add currency : Default = KSH
                    // frequency: tenancy.frequency, // Uncomment to add tenancy frequency
                    firstName: tenancy.tenant.firstName,
                    lastName: tenancy.tenant.lastName,
                    unitKey: tenancy.unit.unitKey

                }


                return formattedTenancy
            })
            return { success: true, message: 'Success.', data: response };
        } catch (error) {
            logger.error(error);
            return { success: false, message: 'An unknown error occurred while fetching tenancies', data: null }
        }
    }

    public async endTenancy(tenancyId: string): Promise<BaseResponse> {
        try {
            return { success: true, message: 'Success!', data: null };
        } catch (error) {
            return { success: false, message: 'An unknown error occurred while ending tenancy', data: null };
        }
    }

    public async tenantHasActiveTenancy(tenantId: string): Promise<boolean> {
        try {
            // Validate tenant id
            if (!tenantId || tenantId === "") return false

            // Find user's active tenancy
            const hasActiveTenancy = await Tenancies.findOneBy({ tenantId: tenantId });

            // Tenant has an active tenancy return true
            return !!hasActiveTenancy;
        } catch (error) {
            logger.error(error);
            return false;
        }
    }

    public async isVacant(unitId: string, buildingId: string): Promise<IsVacantResponse | null> {
        try {
            // validate unit id
            if (!unitId || unitId === "") return null;

            const isVacant = await Unit
                .createQueryBuilder('unit')
                .leftJoinAndSelect('unit.tenant', 'tenant')
                .where('unit.id = :unitId', { unitId })
                .andWhere('unit.buildingId = :buildingId', { buildingId })
                .getOne();

            console.log("Is unit vacant? ", isVacant);

            // Find unit's active tenancy
            if (!isVacant?.tenant && isVacant) {
                return { unitId: isVacant.id, rent: isVacant.rent };
            };
            return null;
        } catch (error) {
            logger.error(error);
            return null;
        }
    }

    public async occupyUnit(buildingId: string, unitId: string, tenantId: string): Promise<{ success: boolean, message?: string }> {
        try {
            // const tenant = await User.findOne({ where: { id: tenancy.tenantId } })

            // if (!tenant) throw new Error(`Tenant ${tenancy.tenantId} not found`);

            // await Unit.update({ id: tenancy.unitId }, { tenant: tenant });

            // validate unit id
            if (!unitId || unitId === "") return { success: false, message: "Invalid unit Id!" };

            // Check if unit exists
            const unit = await Unit.findOne({ where: { id: unitId, buildingId: buildingId } });

            if (!unit) return { success: false, message: "Unit does not exist!" };

            // find tenant
            const tenant = await User.findOneBy({ id: tenantId });

            if (!tenant) return { success: false, message: "Tenant not found!" };

            if (!unit.tenant) {
                unit.tenant = tenant;
                await unit.save();
                return { success: true, message: "Tenant assigned to unit!" };
            }

            return { success: false }

        } catch (error) {
            logger.error(error);
            return { success: false }
        }
    }

    public async vacateUnit(buildingId: string, unitId: string) {
        try {
            const unit = await Unit.findOne({ where: { id: unitId, buildingId: buildingId } });

            if (!unit) { return false };

            unit.tenant = null;
            await unit.save();
            return true;
        } catch (error) {

        }
    }

};

export const tenancyClass = new TenancyClass();