import { DashboardController } from "@/controllers/dashboard.controller";
import { authenticate } from "@/middlewares/auth.middleware";
import { Router } from "express";

class DashRoutes {
    router: Router;
    dashController: DashboardController;
    constructor() {
        this.router = Router();
        this.dashController = new DashboardController();
        this.routes();
    }

    routes(): void {
        this.router.post("/metrics", authenticate, this.dashController.fetchDashMetrics);
    }
}

export const dashRoutes = new DashRoutes();