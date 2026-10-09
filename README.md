# RentifyAPI

A robust Node.js/TypeScript REST API built with Express, TypeORM, and MySQL for the Rentify platform.

## Features

- 🚀 TypeScript for type safety
- ⚡ Express.js web framework
- 🗄️ TypeORM with MySQL database
- 🔄 API versioning support
- 📝 Automatic version management
- 🛡️ Security with Helmet and CORS
- 📊 Request logging with Morgan and Winston
- ✅ Input validation with express-validator
- 🔧 Class-based architecture

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** (v10.19.0 or higher) - Install via `npm install -g pnpm`
- **MySQL/MariaDB** - [Installation Guide](https://mariadb.org/download/)
- **Git** - [Download](https://git-scm.com/)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/realcodeblooded/RentifyAPI.git
cd RentifyAPI
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up MySQL Database

#### Start MySQL/MariaDB service:

**On Linux (Arch/systemd):**
```bash
sudo systemctl start mariadb
sudo systemctl enable mariadb  # Enable auto-start on boot
```

**On macOS:**
```bash
brew services start mysql
```

**On Windows:**
```bash
# MySQL should start automatically, or use:
net start MySQL
```

#### Create Database and User:

```bash
# Login to MySQL as root
sudo mysql -u root -p
```

Run the following SQL commands:

```sql
-- Create the database
CREATE DATABASE RentifyDB;

-- Create user with password
CREATE USER 'rentifyUser'@'localhost' IDENTIFIED BY 'password';

-- Grant privileges
GRANT ALL PRIVILEGES ON RentifyDB.* TO 'rentifyUser'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;

-- Verify
SHOW GRANTS FOR 'rentifyUser'@'localhost';

-- Exit MySQL
EXIT;
```

#### Test the connection:

```bash
mysql -u rentifyUser -p RentifyDB
# Enter password: password
```

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Update the `.env` file with your database credentials:

### 5. Run Database Migrations

```bash
# Run migrations to create tables
pnpm run migration:run
```

### 6. Start the Development Server

```bash
pnpm run dev
```

You should see output similar to:

```
Server running on port 3000
Environment: development
API Version: v1
App Version: 1.0.0
Database connected successfully
```

### 7. Test the API

Open your browser or use curl to test:

```bash
# Health check endpoint
curl http://localhost:3000/api/health/status
```

Expected response:

```json
{
  "status": "OK",
  "timestamp": "2026-01-17T14:30:00.000Z",
  "version": "1.0.0",
  "apiVersion": "v1",
  "buildDate": "2026-01-17T14:30:00.000Z"
}
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm run dev` | Start development server with hot reload |
| `pnpm run build` | Compile TypeScript to JavaScript |
| `pnpm start` | Run production server (requires build first) |
| `pnpm run migration:generate -- src/migrations/MigrationName` | Generate new migration |
| `pnpm run migration:run` | Run pending migrations |
| `pnpm run migration:revert` | Revert last migration |
| `pnpm run lint` | Check code for linting errors |
| `pnpm run lint:fix` | Auto-fix linting errors |
| `pnpm test` | Run tests |

## Project Structure

```
RentifyAPI/
├── src/
│   ├── config/           # Configuration files
│   │   ├── database.ts   # TypeORM configuration
│   │   ├── environment.ts # Environment variables
│   │   └── version.ts    # Version information
│   │   └── cloudinary.ts    # Cloudinary configuration
│   │   └── upload.ts    # Multer config
│   │   └── jest.config.ts    # Jest config
│   ├── controllers/      # Route controllers
│   │   └── __tests__     # Spec files
│   ├── entities/         # TypeORM entities
│   ├── middlewares/      # Express middlewares
│   ├── migrations/       # Database migrations
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   └── validators.ts     # Request validators
│   └── app.ts            # Application entry point
├── logs/                 # Application logs
├── dist/                 # Compiled JavaScript (generated)
├── .env                  # Environment variables (not in git)
├── .env.example          # Environment template
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
├── nodemon.json          # Nodemon configuration
└── README.md             # This file
```

## API Endpoints

### Health Check

- **GET** `/api/health/status` - Get API health and version info

## Version Management

This project uses semantic versioning (MAJOR.MINOR.PATCH).

### Updating Version

```bash
# Patch version (bug fixes): 1.0.0 -> 1.0.1
npm version patch

# Minor version (new features): 1.0.0 -> 1.1.0
npm version minor

# Major version (breaking changes): 1.0.0 -> 2.0.0
npm version major
```

The version is automatically read from `package.json` and displayed in API responses.

## Production Deployment

### 1. Build the project

```bash
pnpm run build
```

### 2. Update environment

```bash
# Set NODE_ENV to production in .env
NODE_ENV=production
```

### 3. Run migrations

```bash
pnpm run migration:run
```

### 4. Start the server

```bash
pnpm start
```

### Using PM2 (Recommended for production)

```bash
# Install PM2
npm install -g pm2

# Start the application
pm2 start dist/app.js --name rentify-api

# Save PM2 configuration
pm2 save

# Set up PM2 to start on boot
pm2 startup
```

## Troubleshooting

### Database Connection Issues

**Error: `ER_ACCESS_DENIED_ERROR`**
- Check your database credentials in `.env`
- Verify user has proper permissions: `SHOW GRANTS FOR 'rentifyUser'@'localhost';`

**Error: `ER_BAD_DB_ERROR`**
- Ensure database exists: `SHOW DATABASES;`
- Create it if missing: `CREATE DATABASE RentifyDB;`

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or change port in .env
PORT=3001
```

### TypeScript Errors

```bash
# Clear build cache
rm -rf dist/

# Reinstall dependencies
rm -rf node_modules/
pnpm install

# Rebuild
pnpm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Contact

For questions or support, please open an issue on GitHub.

---

**Happy Coding! 🚀**