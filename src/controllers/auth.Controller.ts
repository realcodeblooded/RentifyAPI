import { authClass } from "../classes/auth.Class"
import { BaseRole } from "../types/role.Types";
import { Request, Response } from "express"

export class AuthController {
    async addRole(req: Request, res: Response) {
        try {
            // Get the role details from the reequest body
            const newRole: BaseRole = req.body;
            // Attempt to save the role to the DB
            const isRoleAdded = await authClass.addRole(newRole);

            if (!isRoleAdded.success) {
                return res.status(400).json({
                    ...isRoleAdded
                })
            }

            return res.status(200).json({
                ...isRoleAdded
            })

        } catch (error) {
            res.status(500).json({
                error
            })
        }
    };
};