import dotenv from 'dotenv';

dotenv.config();

/**
 * Application configuration object loaded from environment variables.
 * Uses dotenv to load variables from .env file with fallback default values.
 * 
 * @constant
 * @type {Object}
 * 
 * @property {string} nodeEnv - Current Node environment (development, production, test)
 * @property {number} port - Port number for the server to listen on
 * @property {string} apiVersion - API version identifier
 * @property {string} appVersion - Application version number
 * 
 * @property {Object} db - Database configuration object
 * @property {string} db.host - Database server hostname
 * @property {number} db.port - Database server port number
 * @property {string} db.username - Database authentication username
 * @property {string} db.password - Database authentication password
 * @property {string} db.database - Database name to connect to
 * 
 * @example
 * // Access server configuration
 * const serverPort = config.port;
 * 
 * @example
 * // Access database configuration
 * const dbConfig = config.db;
 * console.log(`Connecting to ${dbConfig.host}:${dbConfig.port}`);
 * 
 * @default
 * Default values when environment variables are not set:
 * - nodeEnv: 'development'
 * - port: 3000
 * - apiVersion: 'v1'
 * - appVersion: '1.0.0'
 * - db.host: 'localhost'
 * - db.port: 3306
 * - db.username: 'root'
 * - db.password: ''
 * - db.database: 'myapp'
 */
export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  apiVersion: process.env.API_VERSION || 'v1',
  appVersion: process.env.APP_VERSION || '1.0.0',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'myapp',
  },
};