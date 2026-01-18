import Express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from '../config/environment';
import { AppDataSource } from '../config/database';
import { logger } from '..//utils/logger';
import { routes } from '../routes';
import morgan from 'morgan';
import { loggerMiddleware } from '../middlewares/logger.middleware';
import { errorMiddleware } from '../middlewares/error.middleware';

/**
 * Main server class that configures and starts the Express application.
 * Handles middleware initialization, route configuration, and database connection.
 */
export class Server {
    /** Express application instance */
    server = Express();

    /**
     * Starts the server by initializing middleware, configuring routes,
     * connecting to the database, and listening on the configured port.
     * 
     * @throws {Error} If server initialization fails, logs error and exits process
     */
    async start() {
        try {
            this.initializeMiddleware();
            this.configureRoutes();
            this.server.use(errorMiddleware);
            await this.initializeDatabase();

            const PORT = config.port;
            this.server.listen(PORT, () => {
                logger.info(`Server is running on port ${PORT}`);
            });
        } catch (error) {
            logger.error('Unable to start server:', error);
            process.exit(1);
        }
    }

    /**
     * Initializes Express middleware in the correct order.
     * Includes JSON parsing, CORS, security headers, URL encoding,
     * custom logging, error handling, and HTTP request logging.
     * 
     * @private
     */
    private initializeMiddleware() {
        this.server.use(Express.json());
        this.server.use(cors());
        this.server.use(helmet());
        this.server.use(Express.urlencoded({ extended: true }));
        this.server.use(loggerMiddleware);
        this.server.use(morgan('combined'));
    }

    /**
     * Configures application routes by mounting the router at the '/api' path.
     * 
     * @private
     */
    private configureRoutes() {
        this.server.use('/api', routes.router);
    }

    /**
     * Initializes the database connection using TypeORM's AppDataSource.
     * Logs success message once connected.
     * 
     * @private
     * @async
     * @returns {Promise<void>}
     */
    private async initializeDatabase(): Promise<void> {
        await AppDataSource.initialize();
        logger.info('Database connected successfully');
    }
}