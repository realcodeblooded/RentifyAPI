import { Server } from './classes/server';

/**
 * Application entry point.
 * 
 * Creates and starts the Express server instance. This file initializes
 * the server which handles middleware setup, route configuration, and
 * database connection before listening for incoming requests.
 * 
 * @module index
 * 
 * @example
 * // Run the application
 * node dist/index.js
 * 
 * @example
 * // Run in development mode
 * npm run dev
 */

/**
 * Main server instance.
 * 
 * @type {Server}
 * @constant
 */
const app: Server = new Server();

// Start the server
app.start();