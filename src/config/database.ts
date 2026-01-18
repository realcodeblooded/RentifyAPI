import { DataSource } from 'typeorm';
import { config } from './environment';

/**
 * TypeORM DataSource configuration for MySQL database connection.
 * 
 * Configures the database connection with environment-specific settings:
 * - Automatic schema synchronization enabled in development mode
 * - SQL query logging enabled in development mode
 * - Entity, migration, and subscriber file paths configured
 * 
 * @constant
 * @type {DataSource}
 * 
 * @property {string} type - Database type (MySQL)
 * @property {string} host - Database host from environment config
 * @property {number} port - Database port from environment config
 * @property {string} username - Database username from environment config
 * @property {string} password - Database password from environment config
 * @property {string} database - Database name from environment config
 * @property {boolean} synchronize - Auto-sync schema (enabled only in development)
 * @property {boolean} logging - Enable SQL query logging (enabled only in development)
 * @property {string[]} entities - Glob pattern for entity files
 * @property {string[]} migrations - Glob pattern for migration files
 * @property {Array} subscribers - Database subscribers (currently empty)
 * 
 * @example
 * // Initialize the database connection
 * await AppDataSource.initialize();
 * 
 * @example
 * // Access a repository
 * const userRepository = AppDataSource.getRepository(User);
 */
export const AppDataSource: DataSource = new DataSource({
  type: 'mysql',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: config.nodeEnv === 'development',
  logging: config.nodeEnv === 'development',
  entities: [config.nodeEnv === 'production' 
      ? 'dist/entities/**/*.js' 
      : 'src/entities/**/*.ts'],
  migrations: [config.nodeEnv === 'production' 
      ? 'dist/migrations/**/*.js' 
      : 'src/migrations/**/*.ts'],
  subscribers: [],
});