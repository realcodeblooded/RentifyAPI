import { userClass } from "../classes/user.Class";
import { BaseUserDetails } from "@/types/user.Types";
import { logger } from "../utils/logger";
import { Request, Response } from "express";
import { RoleKey } from "../types/role.Types";

export class UserController {
    async addManager(req: Request, res: Response) {
        try {
            const userData: BaseUserDetails = req.body;

            const isUserAdded = await userClass.addUser({...userData }, RoleKey.MANAGER);

            if(!isUserAdded.success) {
                return res.status(400).json({ isUserAdded });
            }

            return res.status(200).json({ isUserAdded });
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: "An unexpected error occured when adding manager",
                error: error
            })
        }
    };

    async addTenant(req: Request, res: Response) {
        try {
            const userData: BaseUserDetails = req.body;

            const isUserAdded = await userClass.addUser({...userData }, RoleKey.TENANT);

            if(!isUserAdded.success) {
                return res.status(400).json({ isUserAdded });
            }

            return res.status(200).json({ isUserAdded });
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: "An unexpected error occured when adding tenant",
                error: error
            })
        }
    };

    async addAdmin(req: Request, res: Response) {
        try {
            const userData: BaseUserDetails = req.body;

            const isUserAdded = await userClass.addUser({...userData }, RoleKey.ADMIN);

            if(!isUserAdded.success) {
                return res.status(400).json({ isUserAdded });
            }

            return res.status(200).json({ isUserAdded });
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: "An unexpected error occured when adding tenant",
                error: error
            })
        }
    };
};