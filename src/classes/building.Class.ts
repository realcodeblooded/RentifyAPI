import { logger } from "../utils/logger";
import { BaseBuilding } from "../types/building.Types";
import { Buildings } from "../entities/buildings.Entity";
import { IMAGES_TO_BASE64 } from "../services/images.Services";
import { BaseResponse } from "../types/response.types";

class BuildingClass {
    async createBuilding(building: BaseBuilding): Promise<BaseResponse> {
        try {
            /**
             * Uncomment to add photos
             */
            // const base64Photos = IMAGES_TO_BASE64(building.photos, 10);

            // if (base64Photos.Error) {
            //     return { success: false, message: base64Photos.Error, data: base64Photos.Error }
            // }

            const newBuilding = Buildings.create({
                ...building,
                // photos: base64Photos.Images
            })

            const buildingCreated = await newBuilding.save();

            return { success: true, message: "Building added successfully", data: buildingCreated };
        } catch (error) {
            logger.error(error)
            return { success: false, message: "An error occurred when creating a building", data: error }
        }
    };

    async fetchBuildings(): Promise<BaseResponse> {
        try {
            const buildings = await Buildings.find();

            return { success: true, message: 'Success!', data: buildings };
        } catch (error) {
            logger.error(error)
            return { success: false, message: "An error occurred when fetching buildings", data: error }
        }
    }
}

export const buildingClass = new BuildingClass();