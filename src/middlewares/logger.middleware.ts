import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

/**
 * Request logging middleware for Express application.
 * 
 * Logs incoming HTTP requests with their method and path.
 * This middleware should be registered early in the middleware chain
 * to capture all incoming requests.
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * 
 * @returns {void} Calls next() to pass control to the next middleware
 * 
 * @example
 * // Register in Express app
 * app.use(loggerMiddleware);
 * 
 * @example
 * // Log output for incoming request
 * // INFO: GET /api/users
 * // INFO: POST /api/auth/login
 */
export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`${req.method} ${req.path}`);
  next();
};