import { AppDataSource } from "../config/database";
import { Roles } from "../entities/roles.Entity";
import { RoleKey } from "../types/role.Types";
import { logger } from "../utils/logger";

const seedRoles = async () => {
    try {
        await AppDataSource.initialize();
        logger.info("Database connected for seeding...");

        const roleRepository = AppDataSource.getRepository(Roles);

        const rolesToSeed = [
            { key: RoleKey.ADMIN, name: "Administrator", description: "System Administrator with full access", isSystemDefault: true },
            { key: RoleKey.TENANT, name: "Tenant", description: "Tenant user with limited access", isSystemDefault: true },
            { key: RoleKey.MANAGER, name: "Manager", description: "Property Manager with management access", isSystemDefault: true },
        ];

        for (const roleData of rolesToSeed) {
            const existingRole = await roleRepository.findOne({ where: { key: roleData.key } });

            if (!existingRole) {
                const newRole = roleRepository.create(roleData);
                await roleRepository.save(newRole);
                logger.info(`Role ${roleData.key} seeded successfully.`);
            } else {
                logger.info(`Role ${roleData.key} already exists.`);
            }
        }

        logger.info("Role seeding completed.");
        process.exit(0);
    } catch (error) {
        logger.error("Error seeding roles:", error);
        process.exit(1);
    }
};

seedRoles();
