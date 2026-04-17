import { tenancyService } from "../services/tenancy.Service";
import { BaseTenancyDetails } from "@/types/tenancy.Types";
import { Request, Response } from "express";

export class TenancyController {
    async addTenancy(req: Request, res: Response) {
        try {
            const tenancyDetails: BaseTenancyDetails = req.body;

            const tenancyCreated = await tenancyService.createTenancy(tenancyDetails);

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

    public fetchTenancies = async (req: Request, res: Response) => {
        try {
            const tenancies = await tenancyService.fetchTenancies();

            if (!tenancies.success) {
                return res.status(400).json({
                    ...tenancies
                })
            };

            return res.status(200).json({
                ...tenancies
            })
        } catch (error) {
            res.status(500).json({
                message: 'An unexpected error occurred while fetching tenancies',
                error: error
            })
        }
    }

    public vacateUnit = async (req: Request, res: Response) => {
        try {
            const { tenancyId } = req.body
            const isVacated = await tenancyService.endTenancy(tenancyId);

            if (!isVacated.success) return res.status(400).json({ ...isVacated });

            return res.status(400).json({ ...isVacated });
        } catch (error) {
            res.status(500).json({
                message: 'An unexpected error occurred while vacating unit',
                error: error
            });
        }
    }
};