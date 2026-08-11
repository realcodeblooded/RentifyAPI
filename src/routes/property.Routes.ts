import { selfUpload } from "../services/images.Services";
import { PropertyController } from "../controllers/property.Controller";
import { Router } from "express";

class PropertyRoutes {
    controller: PropertyController;
    router: Router;

    constructor() {
        this.controller = new PropertyController();
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/AddProperty', selfUpload.array("photos"), this.controller.addProperty);
        this.router.get('/FetchProperty', this.controller.fetchProperty);
    }
};

export const propertyRoutes = new PropertyRoutes();