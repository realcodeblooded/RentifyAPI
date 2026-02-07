import { validate } from "../middlewares/validate.middleware";
import { UserController } from "../controllers/user.Controller";
import { Router } from "express";
import { userSchema } from "../validators/user.Validators";

class UserRoutes {
    router: Router;
    controller: UserController;

    constructor() {
        this.router = Router();
        this.controller = new UserController();
        this.initializeRoutes();
    };

    initializeRoutes() {
        this.router.post("/CreateManager", validate(userSchema), this.controller.addManager);
    }
}

export const userRoutes = new UserRoutes()