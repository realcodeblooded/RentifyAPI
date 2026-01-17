import { getVersionInfo } from "../config/version";
import { Router } from "express";

class HealthRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/status', (req, res) => {
            return res.json({
                status: 'OK',
                timestamp: new Date().toISOString(),
                ...getVersionInfo(),
            });
        });
    }
}

export const healthRoutes = new HealthRoutes();