import { Router } from "express";
import { healthRoutes } from "./health";
import { userRoutes } from "./user.Routes";
import { buildingRoutes } from "./building.Routes";
import { unitRoutes } from "./unit.Routes";
import { authRoutes } from "./auth.Routes";
import { authenticate } from "@/middlewares/auth.middleware";
import { tenancyRoutes } from "./tenancy.Routes";

/**
 * Main application routes configuration class.
 * 
 * Centralizes all route definitions and mounts sub-routers for different
 * feature modules. Acts as the primary router that gets mounted to the Express app.
 */
class Routes {
    /** Express router instance for all application routes */
    router: Router;

    /**
     * Creates a new Routes instance and initializes all routes.
     * 
     * @constructor
     */
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    /**
     * Initializes and mounts all application route modules.
     * 
     * Registers sub-routers for different feature areas of the application.
     * Add new route modules here as the application grows.
     * 
     * @private
     * @returns {void}
     * 
     * @example
     * // Current routes structure:
     * // /health/* - Health check endpoints
     * 
     * @example
     * // Adding new routes:
     * // this.router.use('/users', userRoutes.router);
     * // this.router.use('/auth', authRoutes.router);
     */
    initializeRoutes(): void {
        // Define your routes here
        this.router.use('/health', healthRoutes.router);
        this.router.use('/users', authenticate, userRoutes.router);
        this.router.use('/buildings', authenticate, buildingRoutes.router);
        this.router.use('/units', authenticate, unitRoutes.router);
        this.router.use('/auth', authRoutes.router);
        this.router.use('/tenancies', authenticate, tenancyRoutes.router)
    }
}

/**
 * Singleton instance of Routes.
 * 
 * Provides the main router with all application routes configured
 * and ready to be mounted in the Express application.
 * 
 * @constant
 * @type {Routes}
 * 
 * @example
 * // Mount main routes in Express app
 * app.use('/api', routes.router);
 * 
 * @example
 * // Available endpoints after mounting at /api:
 * // GET /api/health/status
 */
export const routes = new Routes();