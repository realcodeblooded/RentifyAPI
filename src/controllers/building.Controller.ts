import { buildingClass } from "../classes/building.Class";
import { BaseBuilding } from "../types/building.Types";
import { Request, Response } from "express";

export class BuildingController {
    async addBuilding(req: Request, res: Response) {
        try {
            const buildingData: BaseBuilding = req.body;
            req.body.photos = req.files as Express.Multer.File[];
            console.log(req.body.photos)

            const buildingCreated = await buildingClass.createBuilding(buildingData);

            if (!buildingCreated.success) {
                return res.status(400).json({
                    ...buildingCreated
                })
            }

            return res.status(200).json({
                ...buildingCreated
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error });
        }
    }
}