import { unitClass } from "../classes/unit.Class"
import { BaseUnitDetails } from "../types/unit.Types"
import { Request, Response } from "express"

export class UnitController {
    async addUnit(req: Request, res: Response) {
        try {
            const unitDetails: BaseUnitDetails = req.body

            const isUnitAdded = await unitClass.addUnit(unitDetails);

            if (!isUnitAdded.success) {
                return res.status(404).json({
                    ...isUnitAdded
                })
            }

            return res.status(200).json({
                ...isUnitAdded
            })

        } catch (error) {
            return res.status(500).json({ error: 'An unexpected error occurred while adding a unit', data: error })
        }
    }

    async fetchUnits(req: Request, res: Response) {
        try {

            const units = await unitClass.fetchUnits();

            return res.status(200).json({
                ...units
            })

        } catch (error) {
            return res.status(500).json({
                error: 'An unexpected error occurred while fetching units!',
                data: error
            })
        }
    }
}