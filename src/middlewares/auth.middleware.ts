import { Request, Response, NextFunction } from "express";
import { jwtService } from "@/services/jwt.service";
import { logger } from "@/utils/logger";

/**
 * Middleware to authenticate requests using JWT
 * 
 * Verifies the Bearer token processing in the Authorization header.
 * If valid, it attaches the decoded user payload to req.user.
 */
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "No authorization header provided" });
        }

        const parts = authHeader.split(' ');

        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ message: "Invalid authorization header format" });
        }

        const token = parts[1];
        const payload = jwtService.verifyToken(token);

        if (!payload) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        // Attach user info to request object
        (req as any).user = payload;

        next();
    } catch (error) {
        logger.error(`Authentication error: ${error}`);
        return res.status(500).json({ message: "Internal server error during authentication" });
    }
};
