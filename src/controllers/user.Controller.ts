import { userService } from "../services/user.Service";
import { BaseUserDetails, CreateUserRequest } from "@/types/user.Types";
import { logger } from "../utils/logger";
import { Request, Response } from "express";
import { RoleKey } from "../types/role.Types";

export class UserController {
  async addManager(req: Request, res: Response) {
    try {
      const userData: CreateUserRequest = req.body;

      const isUserAdded = await userService.addUser(
        { ...userData },
        RoleKey.MANAGER,
      );

      if (!isUserAdded.success) {
        return res.status(400).json({ isUserAdded });
      }

      return res.status(200).json({ isUserAdded });
    } catch (error) {
      logger.error(error);
      res.status(500).json({
        message: "An unexpected error occured when adding manager",
        error: error,
      });
    }
  }

  async addTenant(req: Request, res: Response) {
    try {
      const userData: CreateUserRequest = req.body;

      const isUserAdded = await userService.addUser(
        { ...userData },
        RoleKey.TENANT,
      );

      if (!isUserAdded.success) {
        return res.status(400).json({ isUserAdded });
      }

      return res.status(200).json({ isUserAdded });
    } catch (error) {
      logger.error(error);
      res.status(500).json({
        message: "An unexpected error occured when adding tenant",
        error: error,
      });
    }
  }

  async addAdmin(req: Request, res: Response) {
    try {
      const userData: CreateUserRequest = req.body;

      const isUserAdded = await userService.addUser(
        { ...userData },
        RoleKey.ADMIN,
      );

      if (!isUserAdded.success) {
        return res.status(400).json({ isUserAdded });
      }

      return res.status(200).json({ isUserAdded });
    } catch (error) {
      logger.error(error);
      res.status(500).json({
        message: "An unexpected error occured when adding tenant",
        error: error,
      });
    }
  }

  async fetchusers(req: Request, res: Response) {
    try {
      const users = await userService.fetchUsers();

      return res.status(200).json({
        ...users,
      });
    } catch (error) {
      logger.error(error);
      return res.status(500).json({
        message: "An unexpected error occurred when fetching users",
        error: error,
      });
    }
  }

  async fetchUserDetails(req: Request, res: Response) {
    try {
      const id: string = req.params.id;

      const user = await userService.fetchUserDetails(id);

      if (!user.success) {
        return res.status(400).json(user);
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({
        message: "An unexpected error occurred while fetching the user details",
        error,
      });
    }
  }
}
