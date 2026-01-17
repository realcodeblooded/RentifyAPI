import { getVersionInfo } from "../config/version";
import { Router } from "express";
import { Server } from "../classes/server";
import { healthRoutes } from "./health";

class Routes  {
    router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Define your routes here
        this.router.use('/health', healthRoutes.router);
    }
}

export const routes = new Routes();