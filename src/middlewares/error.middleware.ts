import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

/**
 * Global error handling middleware for Express application.
 * 
 * Catches and processes all errors that occur during request handling.
 * Logs the error stack trace and sends a standardized JSON error response.
 * In development mode, includes the full stack trace in the response for debugging.
 * 
 * @param {Error} err - The error object that was thrown or passed to next()
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function (unused)
 * 
 * @returns {void} Sends a JSON response with error details
 * 
 * @example
 * // Register as the last middleware in your Express app
 * app.use(errorMiddleware);
 * 
 * @example
 * // Error response in production
 * {
 *   "success": false,
 *   "message": "Database connection failed"
 * }
 * 
 * @example
 * // Error response in development (includes stack trace)
 * {
 *   "success": false,
 *   "message": "Database connection failed",
 *   "stack": "Error: Database connection failed\n    at ..."
 * }
 */
export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.stack);

  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};