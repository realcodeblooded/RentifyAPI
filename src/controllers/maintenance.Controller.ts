import { Request, Response } from "express";
import { maintenanceService } from "../services/maintenance.Service";
import {
  CreateMaintenanceRequest,
  ResolveMaintenanceRequest,
} from "@/types/maintenance.Types";
import { validate } from "@/middlewares/validate.middleware";

export class MaintenanceController {
  async createRequest(req: Request, res: Response) {
    try {
      const { description, requestedById } = req.body;
      const result = await maintenanceService.createRequest({
        description,
        requestedById,
      });

      if (!result.success) {
        return res.status(400).json(result);
      }

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        error:
          "An unexpected error occurred while creating the maintenance request",
        data: error,
      });
    }
  }

  async fetchRequests(req: Request, res: Response) {
    try {
      const role = "MANAGER"
      const userId = "b5e86f6c-54b3-4c9b-8cf9-386d1411fb4c"
      const result = await maintenanceService.fetchRequests(role, userId);

      if (!result.success) {
        return res.status(404).json(result);
      }

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        error:
          "An unexpected error occurred while fetching maintenance requests",
        data: error,
      });
    }
  }

  async resolveRequest(req: Request, res: Response) {
    try {
      const requestData: ResolveMaintenanceRequest = req.body;
      const { id } = req.params;
      const result = await maintenanceService.resolveRequest(id, requestData);

      if (!result.success) {
        const statusCode = result.message.includes("not found") ? 404 : 400;
        return res.status(statusCode).json(result);
      }

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        error:
          "An unexpected error occurred while resolving the maintenance request",
        data: error,
      });
    }
  }
}
