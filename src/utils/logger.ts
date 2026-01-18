import winston from 'winston';
import { config } from '../config/environment';

/**
 * Winston log format configuration.
 * 
 * Combines multiple formatters to create structured log entries with:
 * - Timestamp in 'YYYY-MM-DD HH:mm:ss' format
 * - Error stack traces when available
 * - String interpolation support (splat)
 * - JSON formatting for structured logging
 * 
 * @constant
 * @type {winston.Logform.Format}
 */
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

/**
 * Application-wide Winston logger instance.
 * 
 * Provides centralized logging with multiple transports:
 * - Console output with colorized, simple format for development
 * - File output for error logs (logs/error.log)
 * - File output for all logs (logs/combined.log)
 * 
 * Log level is set based on environment:
 * - Production: 'info' and above
 * - Development: 'debug' and above
 * 
 * @constant
 * @type {winston.Logger}
 * 
 * @example
 * // Log at different levels
 * logger.debug('Debugging information');
 * logger.info('Server started on port 3000');
 * logger.warn('Deprecated API endpoint used');
 * logger.error('Database connection failed', error);
 * 
 * @example
 * // Log with string interpolation
 * logger.info('User %s logged in from %s', userId, ipAddress);
 * 
 * @example
 * // Log with metadata object
 * logger.info('Payment processed', {
 *   userId: '12345',
 *   amount: 99.99,
 *   currency: 'USD'
 * });
 */
export const logger = winston.createLogger({
  level: config.nodeEnv === 'production' ? 'info' : 'debug',
  format: logFormat,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});