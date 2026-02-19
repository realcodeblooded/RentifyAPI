import { Request, Response } from "express";
import { logger } from "../utils/logger";
import { BaseUserDetails } from "@/types/user.Types";
import { authClass } from "@/classes/auth.Class";
import { AuthRequest } from "@/types/auth.Types";
import { BaseResponse } from "@/types/response.types";

export class AuthController {
    public async login(req: Request, res: Response): Promise<any> {
        try {
            const userData: AuthRequest = req.body;

            if (!userData.email || !userData.password) {
                return res.status(400).json({ success: false, message: "Email and password are required", data: null });
            }

            const loginResult = await authClass.login(userData.email, userData.password);

            if (!loginResult.success) {
                return res.status(400).json(loginResult);
            }

            return res.status(200).json(loginResult);
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: "An unexpected error occured when logging in",
                error: error
            })
        }
    }

    public async refreshToken(req: Request, res: Response): Promise<any> {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.status(400).json({ message: "Refresh token is required" });
            }

            const result = await authClass.refresh(refreshToken);

            if (!result.success) {
                return res.status(401).json({ message: result.message });
            }

            return res.status(200).json(result);
        } catch (error) {
            logger.error(error);
            return res.status(500).json({
                message: "An unexpected error occurred when refreshing token",
                error: error
            });
        }
    }

    public async logOut(req: Request, res: Response): Promise<any> {
        try {
            const { userId } = req.body;

            if (!userId) {
                return res.status(400).json({ message: "User ID is required" });
            }

            const isLoggedOut = await authClass.logout(userId);

            if (!isLoggedOut.success) {
                return res.status(400).json({ message: isLoggedOut.message });
            }
            return res.status(200).json({ message: isLoggedOut.message });
        } catch (error) {
            logger.error(error);
            res.status(500).json({
                message: "An unexpected error occured when logging out",
                error: error
            })
        }
    }
}