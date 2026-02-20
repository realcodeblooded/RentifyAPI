import { Router } from "express";
import { AuthController } from "@/controllers/auth.Controller";
import { authenticate } from "@/middlewares/auth.middleware";

class AuthRoute {
    router: Router;
    authController: AuthController;
    constructor() {
        this.router = Router();
        this.authController = new AuthController();
        this.routes();
    }
    routes(): void {
        this.router.post("/login", this.authController.login);
        this.router.post("/refresh", this.authController.refreshToken);
        this.router.post("/logout", this.authController.logOut);
        this.router.post('/AddRole', authenticate, this.authController.addRole);
    }
}

export const authRoutes = new AuthRoute();