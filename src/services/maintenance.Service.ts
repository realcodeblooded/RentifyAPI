import { AppDataSource } from "@/config/database";
import { User } from "@/entities";
import { Maintenances } from "@/entities/maintenances.Entity";
import {
  CreateMaintenanceRequest,
  ResolveMaintenanceRequest,
} from "@/types/maintenance.Types";
import { BaseResponse } from "@/types/response.types";
import { logger } from "@/utils/logger";
import { tenancyService } from "./tenancy.Service";
import { RoleKey } from "@/types/role.Types";

class MaintenanceService {
  private maintenanceRepository = AppDataSource.getRepository(Maintenances);
  private userRepository = AppDataSource.getRepository(User);

  public async createRequest(
    data: CreateMaintenanceRequest,
  ): Promise<BaseResponse> {
    try {
      // The request id must be from a valid user
      const user = await this.userRepository.findOneBy({
        id: data.requestedById,
      });

      if (!user) {
        return { success: false, message: "Invalid user ID", data: null };
      }
      // The user must have an active tenancy to create a maintenance request
      const hasActiveTenancy = await tenancyService.tenantHasActiveTenancy(data.requestedById);
      if (!hasActiveTenancy) return { success: false, message: "User must have an active tenancy to create a maintenance request", data: null }


      const maintenance = this.maintenanceRepository.create({
        description: data.description,
        requestedBy: user,
      });

      await this.maintenanceRepository.save(maintenance);

      return {
        success: true,
        message: "Maintenance request created successfully.",
        data: null,
      };
    } catch (error) {
      logger.error("Error creating maintenance request:", error);
      return {
        success: false,
        message: "Error creating maintenance request.",
        data: error,
      };
    }
  }

  public async fetchRequests(role: string, userId: string): Promise<BaseResponse> {
    try {
      let requests = [];
      if (role === "TENANT") {
        requests = await this.maintenanceRepository.query("SELECT * FROM maintenances WHERE requestedByid = ?", [userId])
      } else if (role === "MANAGER") {
        requests = await this.maintenanceRepository.query("SELECT * FROM maintenances m INNER JOIN property p ON p.id = m.propertyId WHERE p.propertyManager = ?", [userId])
      }
      const maintenanceRequests = await this.maintenanceRepository.find({
        order: { requestedAt: "DESC" },
      });

      if (!requests || requests.length === 0) {
        return {
          success: false,
          message: "No maintenance requests found.",
          data: null,
        };
      }

      return {
        success: true,
        message: "Maintenance requests fetched successfully.",
        data: requests,
      };
    } catch (error) {
      logger.error("Error fetching maintenance requests:", error);
      return {
        success: false,
        message: "Error fetching maintenance requests.",
        data: error,
      };
    }
  }

  public async resolveRequest(
    id: string,
    data: ResolveMaintenanceRequest,
  ): Promise<BaseResponse> {
    try {
      const request = await this.maintenanceRepository.findOne({
        where: { id },
      });

      if (!request) {
        return {
          success: false,
          message: "Maintenance request not found.",
          data: null,
        };
      }

      if (request.isResolved) {
        return {
          success: false,
          message: "Maintenance request is already resolved.",
          data: null,
        };
      }

      request.isResolved = true;
      request.resolvedAt = new Date();
      request.resolutionNotes = data.resolutionNotes || "";

      await this.maintenanceRepository.save(request);

      return {
        success: true,
        message: "Maintenance request marked as resolved.",
        data: request,
      };
    } catch (error) {
      logger.error("Error resolving maintenance request:", error);
      return {
        success: false,
        message: "Error resolving maintenance request.",
        data: error,
      };
    }
  }
}

export const maintenanceService = new MaintenanceService();
