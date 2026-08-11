import { logger } from "../utils/logger";
import { BaseProperty } from "../types/property.Types";
import { Property } from "../entities/property.Entity";
import { IMAGES_TO_BASE64 } from "./images.Services";
import { BaseResponse } from "../types/response.types";
import { User } from "@/entities";

class PropertyService {
  async createProperty(property: BaseProperty): Promise<BaseResponse> {
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
        .where("user.id = :id", { id: property.propertyOwner })
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

      const newProperty = Property.create({
        ...property,
        propertyManager: user,
        // photos: base64Photos.Images
      });

      const buildingCreated = await newProperty.save();

      return {
        success: true,
        message: "Property added successfully",
        data: null,
      };
    } catch (error) {
      logger.error(error);
      return {
        success: false,
        message: "An error occurred when creating a property",
        data: error,
      };
    }
  }

  async fetchProperty(): Promise<BaseResponse> {
    try {
      const properties = await Property.find();

      return { success: true, message: "Success!", data: properties };
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

export const propertyService = new PropertyService();
