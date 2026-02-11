import { logger } from "../utils/logger";
import { BaseBuilding } from "../types/building.Types";
import { Building } from "../entities/building.Entity";
import { IMAGES_TO_BASE64 } from "../services/images.Services";
import { BaseResponse } from "../types/response.types";

class BuildingClass {
    async createBuilding(building: BaseBuilding): Promise<BaseResponse> {
        try {
            const base64Photos = IMAGES_TO_BASE64(building.photos, 10);

            if (base64Photos.Error) {
                return { success: false, message: base64Photos.Error, data: base64Photos.Error }
            }

            const newBuilding = Building.create({
                ...building,
                photos: base64Photos.Images
            })

            const buildingCreated = await newBuilding.save();

            return { success: true, message: "Building added successfully", data: buildingCreated };
        } catch (error) {
            logger.error(error)
            return { success: false, message: "An error occurred when creating a building", data: null }
        }
    };
}

export const buildingClass = new BuildingClass();