import { dashboardService } from "@/services/dashboard.Service";
import { logger } from "@/utils/logger";
import { Response, Request } from "express";
export class DashboardController {
    async fetchDashMetrics(req: Request, res: Response) {
        try {
            const { userId, propertyId } = req.body;
            const metrics = await dashboardService.getMetrics(userId, propertyId);

            if (!metrics.success) return res.status(400).json(metrics);

            return res.status(200).json(metrics);
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                success: false,
                message: "An unexpected error occurred when fetching dashboard metrics",
                data: null
            })
        }
    }
}