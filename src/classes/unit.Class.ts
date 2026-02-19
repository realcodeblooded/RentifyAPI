import { BaseResponse } from "../types/response.types";
import { BaseUnitDetails } from "../types/unit.Types";
import { logger } from "../utils/logger";
import { Unit } from "../entities/units.Entity";

class UnitClass {
    async addUnit(unitDetails: BaseUnitDetails): Promise<BaseResponse> {
        try {
            const newUnit = Unit.create(unitDetails);
            console.log(newUnit)
            newUnit.save();

            return { success: true, message: 'Unit added successfully', data: null }
        } catch (error) {
            logger.error(error)
            return { success: false, message: "An error occurred while adding a unit", data: error }
        }
    }

    async fetchUnits(): Promise<BaseResponse> {
        try {
            const units = await Unit.find();

            return { success: true, message: 'Success!', data: units }
        } catch (error) {
            logger.error(error);
            return { success: false, message: 'An error occured while fetching units.', data: error }
        }
    }
}

export const unitClass = new UnitClass();