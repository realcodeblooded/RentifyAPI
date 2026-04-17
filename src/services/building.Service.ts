import { logger } from "../utils/logger";
import { BaseBuilding } from "../types/building.Types";
import { Buildings } from "../entities/buildings.Entity";
import { IMAGES_TO_BASE64 } from "./images.Services";
import { BaseResponse } from "../types/response.types";
import { User } from "@/entities";

class BuildingService {
  async createBuilding(building: BaseBuilding): Promise<BaseResponse> {
    try {
      /**
       * Uncomment to add photos
       */
      // const base64Photos = IMAGES_TO_BASE64(building.photos, 10);

      // if (base64Photos.Error) {
      //     return { success: false, message: base64Photos.Error, data: base64Photos.Error }
      // }
      const user = await User.createQueryBuilder("user")
        .leftJoinAndSelect("user.role", "role")
        .where("user.id = :id", { id: building.propertyOwner })
        .getOne();

      if (user === null) {
        return { success: false, message: "User not found!", data: null };
      }

      if (user.role.key !== "MANAGER") {
        return {
          success: false,
          message: "Property owner must be a manager",
          data: null,
        };
      }

      const newBuilding = Buildings.create({
        ...building,
        propertyOwner: user,
        // photos: base64Photos.Images
      });

      const buildingCreated = await newBuilding.save();

      return {
        success: true,
        message: "Building added successfully",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      return {
        success: false,
        message: "An error occurred when creating a building",
        data: error,
      };
    }
  }

  async fetchBuildings(): Promise<BaseResponse> {
    try {
      const buildings = await Buildings.find();

      return { success: true, message: "Success!", data: buildings };
    } catch (error) {
      logger.error(error);
      return {
        success: false,
        message: "An error occurred when fetching buildings",
        data: error,
      };
    }
  }
}

export const buildingService = new BuildingService();
