import { Tenancies, User } from "@/entities";
import { Unit } from "@/entities/units.Entity";
import { BaseResponse } from "@/types/response.types";
import { BaseTenancyDetails } from "@/types/tenancy.Types";
import { logger } from "@/utils/logger";

class TenancyClass {
    public async createTenancy(tenancy: BaseTenancyDetails): Promise<BaseResponse> {
        try {
            // Check if user has an active tenancy
            const hasActiveTenancy = await this.tenantHasActiveTenancy(tenancy.tenantId);

            if (!hasActiveTenancy) return { success: false, message: 'Cannot create new tenancy, kindly end your current tenancy first', data: null };

            // Check if the unit is up for tenancy
            const upForTenancy = await this.isVacant(tenancy.unitId, tenancy.buildingId);

            if (!upForTenancy) return { success: false, message: 'Unit not found or has an active tenant', data: null };

            // If all validations pass, create the tenancy
            const newTenancy = Tenancies.create(tenancy);

            // Occupy the unit
            await this.occupyUnit(tenancy.buildingId, tenancy.unitId, tenancy.tenantId);

            // Add to DB
            await newTenancy.save();

            // Return success
            return { success: true, message: 'Tenancy created successfully.', data: null };
        } catch (error) {
            logger.error(error);
            return { success: false, message: 'An unknown error occurred while creating tenancy.', data: error };
        }
    };

    public async tenantHasActiveTenancy(tenantId: string): Promise<boolean> {
        try {
            // Validate tenant id
            if (!tenantId || tenantId === "") return false

            // Find user's active tenancy
            const hasActiveTenancy = await Tenancies.findOneBy({ tenantId: tenantId });

            // Tenant has an active tenancy return true
            return !hasActiveTenancy;
        } catch (error) {
            logger.error(error);
            return false;
        }
    }

    public async isVacant(unitId: string, buildingId: string): Promise<boolean> {
        try {
            // validate unit id
            if (!unitId || unitId === "") return false;

            const isVacant = await Unit
                .createQueryBuilder('unit')
                .leftJoinAndSelect('unit.tenant', 'tenant')
                .where('unit.id = :unitId', { unitId })
                .andWhere('unit.buildingId = :buildingId', { buildingId })
                .getOne();

            console.log("Is Vacant", isVacant);

            // Find unit's active tenancy
            if (!isVacant?.tenant) return true;

            // If unit has an active tenancy, return true
            return false;
        } catch (error) {
            logger.error(error);
            return false;
        }
    }

    public async occupyUnit(buildingId: string, unitId: string, tenantId: string): Promise<boolean> {
        try {
            // validate unit id
            if (!unitId || unitId === "") return false;

            // Check if unit exists
            const unit = await Unit.findOne({ where: { id: unitId, buildingId: buildingId } });

            if (!unit) return false;

            // find tenant
            const tenant = await User.findOneBy({ id: tenantId });

            if (!tenant) return false;

            if (!unit.tenant) {
                unit.tenant = tenant;
                await unit.save();
                return true;
            }

            return false

        } catch (error) {
            logger.error(error);
            return false
        }
    }

};

export const tenancyClass = new TenancyClass();