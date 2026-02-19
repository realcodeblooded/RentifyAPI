import { AuthController } from "../controllers/auth.Controller";
import { Router } from "express";

class AuthRoutes {
    // Express router, Controller
    router: Router
    private controller: AuthController

    // Initialize methods
    constructor() {
        this.controller = new AuthController;
        this.router = Router();
        this.initializeRoutes();
    }

    // Define routes
    private initializeRoutes() {
        this.router.post('/AddRole', this.controller.addRole);
    }
}

export const authRoutes = new AuthRoutes();