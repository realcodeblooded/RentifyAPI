import { selfUpload } from "../services/images.Services";
import { BuildingController } from "../controllers/building.Controller";
import { Router } from "express";

class BuildingRoutes {
    controller: BuildingController;
    router: Router;

    constructor() {
        this.controller = new BuildingController();
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/AddBuilding', selfUpload.array("photos"), this.controller.addBuilding);
        this.router.get('/FetchBuildings', this.controller.fetchbuildings);
    }
};

export const buildingRoutes = new BuildingRoutes();