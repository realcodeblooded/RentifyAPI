import { Router } from "express";
import { MaintenanceController } from "@/controllers/maintenance.Controller";
import { validate } from "@/middlewares/validate.middleware";
import {
  maintenanceSchema,
  maintenanceResolveSchema,
} from "@/validators/maintenance.Validator";

class MaintenanceRoutes {
  controller: MaintenanceController;
  router: Router;

  constructor() {
    this.controller = new MaintenanceController();
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      "/CreateMaintenanceRequest",
      validate(maintenanceSchema),
      this.controller.createRequest,
    );
    this.router.get("/FetchMaintenanceRequests", this.controller.fetchRequests);
    this.router.patch(
      "/ResolveMaintenanceRequest/:id",
      validate(maintenanceResolveSchema),
      this.controller.resolveRequest,
    );
  }
}

export const maintenanceRoutes = new MaintenanceRoutes();
