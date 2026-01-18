import { Response } from 'express';

/**
 * Standardized API response utility class.
 * 
 * Provides static methods to send consistent JSON responses for both
 * successful and error scenarios across the application.
 */
export class ApiResponse {
  /**
   * Sends a standardized success response.
   * 
   * Returns a JSON response with a success flag, optional message, and data payload.
   * 
   * @static
   * @param {Response} res - Express response object
   * @param {any} data - Data payload to include in the response
   * @param {string} [message='Success'] - Success message description
   * @param {number} [statusCode=200] - HTTP status code (default: 200 OK)
   * 
   * @returns {Response} Express response object with JSON payload
   * 
   * @example
   * // Basic success response
   * ApiResponse.success(res, { userId: 123, name: 'John' });
   * // Response: { success: true, message: 'Success', data: { userId: 123, name: 'John' } }
   * 
   * @example
   * // Success with custom message
   * ApiResponse.success(res, userData, 'User created successfully', 201);
   * // Response: { success: true, message: 'User created successfully', data: {...} }
   * 
   * @example
   * // Success with array data
   * ApiResponse.success(res, users, 'Users retrieved', 200);
   */
  static success(res: Response, data: any, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  /**
   * Sends a standardized error response.
   * 
   * Returns a JSON response with a success flag set to false, error message,
   * and optional detailed error information.
   * 
   * @static
   * @param {Response} res - Express response object
   * @param {string} [message='Error'] - Error message description
   * @param {number} [statusCode=500] - HTTP status code (default: 500 Internal Server Error)
   * @param {any} [errors] - Optional detailed error information (validation errors, stack traces, etc.)
   * 
   * @returns {Response} Express response object with JSON payload
   * 
   * @example
   * // Basic error response
   * ApiResponse.error(res, 'User not found', 404);
   * // Response: { success: false, message: 'User not found' }
   * 
   * @example
   * // Error with validation details
   * ApiResponse.error(res, 'Validation failed', 400, {
   *   email: 'Invalid email format',
   *   password: 'Password too short'
   * });
   * // Response: { success: false, message: 'Validation failed', errors: {...} }
   * 
   * @example
   * // Internal server error
   * ApiResponse.error(res, 'Database connection failed', 500);
   */
  static error(res: Response, message = 'Error', statusCode = 500, errors?: any) {
    return res.status(statusCode).json({
      success: false,
      message,
      errors,
    });
  }
}