import { validate } from "../middlewares/validate.middleware";
import { UnitController } from "../controllers/unit.Controller";
import { Router } from "express";
import { unitSchema } from "../validators/unit.Validator";

class UnitRoutes {
    controller: UnitController
    router: Router

    constructor() {
        this.controller = new UnitController();
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/AddUnit', validate(unitSchema), this.controller.addUnit);
        this.router.get('/FetchUnits', this.controller.fetchUnits);
    }
}

export const unitRoutes = new UnitRoutes()