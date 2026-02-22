import { tenancyClass } from "@/classes/tenancy.Class";
import { BaseTenancyDetails } from "@/types/tenancy.Types";
import { Request, Response } from "express";

export class TenancyController {
    async addTenancy(req: Request, res: Response) {
        try {
            const tenancyDetails: BaseTenancyDetails = req.body;

            const tenancyCreated = await tenancyClass.createTenancy(tenancyDetails);

            if (!tenancyCreated.success) {
                return res.status(400).json({
                    ...tenancyCreated
                })
            }

            return res.status(200).json({ ...tenancyCreated });
        } catch (error) {
            res.status(500).json({
                message: 'An unexpected error occurred while creating tenancy',
                error: error
            })
        }
    }
};