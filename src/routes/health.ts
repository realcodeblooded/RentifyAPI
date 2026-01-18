import { getVersionInfo } from "../config/version";
import { Router } from "express";

/**
 * Health check routes for monitoring application status.
 * 
 * Provides endpoints to check if the application is running and retrieve
 * version information. Useful for load balancers, monitoring tools, and deployment pipelines.
 */
class HealthRoutes {
    /** Express router instance for health check routes */
    router: Router;

    /**
     * Creates a new HealthRoutes instance and initializes routes.
     * 
     * @constructor
     */
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    /**
     * Initializes health check route handlers.
     * 
     * Sets up the /status endpoint that returns application health status,
     * current timestamp, and version information.
     * 
     * @private
     * @returns {void}
     * 
     * @example
     * // GET /status response
     * {
     *   "status": "OK",
     *   "timestamp": "2024-01-15T10:30:00.000Z",
     *   "version": "2.3.1",
     *   "buildDate": "2024-01-15T08:00:00.000Z"
     * }
     */
    initializeRoutes() {
        this.router.get('/status', (req, res) => {
            return res.json({
                status: 'OK',
                timestamp: new Date().toISOString(),
                ...getVersionInfo(),
            });
        });
    }
}

/**
 * Singleton instance of HealthRoutes.
 * 
 * Provides a pre-configured router with health check endpoints
 * ready to be mounted in the Express application.
 * 
 * @constant
 * @type {HealthRoutes}
 * 
 * @example
 * // Mount health routes in Express app
 * app.use('/health', healthRoutes.router);
 */
export const healthRoutes = new HealthRoutes();