import { UserController } from "../controllers/user.Controller";
import { Router } from "express";

class UserRoutes {
    router: Router;
    controller: UserController;

    constructor() {
        this.router = Router();
        this.controller = new UserController();
        this.initializeRoutes();
    };

    initializeRoutes() {
        this.router.post("/CreateManager", this.controller.addManager);
    }
}

export const userRoutes = new UserRoutes()