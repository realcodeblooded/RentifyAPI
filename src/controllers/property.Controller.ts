import { logger } from "@/utils/logger";
import { propertyService } from "../services/property.Service";
import { BaseProperty, PropertyType } from "../types/property.Types";
import { Request, Response } from "express";

export class PropertyController {
  async addProperty(req: Request, res: Response) {
    try {
      const propertyData: BaseProperty = req.body;
      req.body.photos = req.files as Express.Multer.File[];

      const propertyCreated = await propertyService.createProperty(propertyData);

      if (!propertyCreated.success) {
        return res.status(400).json({
          ...propertyCreated,
        });
      }

      return res.status(200).json({
        ...propertyCreated,
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ error });
    }
  }

  async fetchProperty(req: Request, res: Response) {
    try {
      const property = await propertyService.fetchProperty();

      if (!property.success) {
        return res.status(404).json({
          ...property,
        });
      }

      return res.status(200).json({
        ...property,
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ error });
    }
  }
}
