import { TenancyController } from "@/controllers/tenancy.Controller";
import { Router } from "express";

class TenancyRoutes {
    router: Router;
    private controller: TenancyController;

    constructor() {
        this.router = Router();
        this.controller = new TenancyController();
        this.routes();
    }

    private routes() {
        this.router.post('/CreateTenancy', this.controller.addTenancy);
        this.router.get('/FetchTenancies', this.controller.fetchTenancies);
        this.router.post('/VacateUnit', this.controller.vacateUnit);
    }
}

export const tenancyRoutes = new TenancyRoutes();