import { userClass } from "../classes/user.Class";
import { BaseUserDetails } from "@/types/user.Types";
import { logger } from "../utils/logger";
import { Request, Response } from "express";
import { RoleKey } from "../types/role.Types";

export class UserController {
    async addManager(req: Request, res: Response) {
        try {
            const userData: BaseUserDetails = req.body;

            console.log(userData)

            const isUserAdded = await userClass.addUser({...userData, roleKey: RoleKey.MANAGER });

            if(!isUserAdded.success) {
                return res.status(400).json({ isUserAdded });
            }

            return res.status(200).json({ isUserAdded });
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: "An unexpected error occured when adding user",
                error: error
            })
        }
    };
};