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
        this.router.post("/CreateTenant", validate(userSchema), this.controller.addTenant);
        this.router.post("/CreateAdmin", validate(userSchema), this.controller.addAdmin);
        this.router.get("/FetchUsers", this.controller.fetchusers);
    }
}

export const userRoutes = new UserRoutes()