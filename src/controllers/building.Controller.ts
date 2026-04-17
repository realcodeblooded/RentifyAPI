import { buildingService } from "../services/building.Service";
import { BaseBuilding } from "../types/building.Types";
import { Request, Response } from "express";

export class BuildingController {
  async addBuilding(req: Request, res: Response) {
    try {
      const buildingData: BaseBuilding = req.body;
      req.body.photos = req.files as Express.Multer.File[];

      const buildingCreated = await buildingService.createBuilding(buildingData);

      if (!buildingCreated.success) {
        return res.status(400).json({
          ...buildingCreated,
        });
      }

      return res.status(200).json({
        ...buildingCreated,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }

  async fetchbuildings(req: Request, res: Response) {
    try {
      const buildings = await buildingService.fetchBuildings();

      if (!buildings.success) {
        return res.status(404).json({
          ...buildings,
        });
      }

      return res.status(200).json({
        ...buildings,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }
}
