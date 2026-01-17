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

export class Server {
    server = Express();

    start() {
        try {
            this.initializeMiddleware();
            this.configureRoutes();
            this.initializeDatabase();

            const PORT = config.port;
            this.server.listen(PORT, () => {
                logger.info(`Server is running on port ${PORT}`);
            });
        } catch (error) {
            logger.error('Unable to start server:', error);
            process.exit(1);
        }
    }

    private initializeMiddleware() {
        this.server.use(Express.json());
        this.server.use(cors());
        this.server.use(helmet());
        this.server.use(Express.urlencoded({ extended: true }));
        this.server.use(loggerMiddleware);
        this.server.use(errorMiddleware);
        this.server.use(morgan('combined'));
    }

    private configureRoutes() {
        this.server.use('/api', routes.router);
    }

    private async initializeDatabase() {
        await AppDataSource.initialize();
        logger.info('Database connected successfully');
    }
}