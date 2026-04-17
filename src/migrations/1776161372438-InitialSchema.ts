import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1776161372438 implements MigrationInterface {
    name = 'InitialSchema1776161372438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` varchar(36) NOT NULL, \`key\` enum ('ADMIN', 'TENANT', 'MANAGER') NOT NULL, \`name\` varchar(100) NOT NULL, \`description\` text NULL, \`isSystemDefault\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_a87cf0659c3ac379b339acf36a\` (\`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`units\` (\`id\` varchar(36) NOT NULL, \`unitKey\` varchar(50) NOT NULL, \`floor\` int NOT NULL, \`buildingId\` varchar(255) NOT NULL, \`type\` enum ('WHOLE_BUILDING', 'GUEST_HOUSE', 'BASEMENT_SUITE', 'STUDIO', 'ONE_BEDROOM', 'TWO_BEDROOM', 'THREE_BEDROOM', 'PENTHOUSE', 'LOFT', 'DUPLEX', 'OFFICE', 'RETAIL', 'WAREHOUSE') NOT NULL, \`description\` text NULL, \`rent\` decimal(10,2) NOT NULL, \`tenantId\` varchar(36) NULL, UNIQUE INDEX \`IDX_7085292b5b7d37930fb3e87b1c\` (\`unitKey\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`amenities\` (\`id\` varchar(36) NOT NULL, \`amenityName\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`buildings\` (\`id\` varchar(36) NOT NULL, \`buildingName\` varchar(100) NOT NULL, \`locationName\` varchar(255) NOT NULL, \`x\` decimal NOT NULL, \`y\` decimal NOT NULL, \`photos\` json NULL, \`type\` enum ('STANDALONE', 'APARTMENT', 'TOWNHOUSE', 'COMMERCIAL', 'MIXED_USE') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`maintenances\` (\`id\` varchar(36) NOT NULL, \`description\` text NOT NULL, \`requestedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`isResolved\` tinyint NOT NULL DEFAULT 0, \`resolvedAt\` timestamp NULL, \`resolutionNotes\` text NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`requestedById\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contracts\` (\`id\` varchar(36) NOT NULL, \`tenancyId\` varchar(255) NOT NULL, \`rent\` decimal(12,2) NOT NULL, \`currency\` enum ('KSH') NOT NULL DEFAULT 'KSH', \`frequency\` enum ('MONTHLY', 'YEARLY', 'QUARTERLY') NOT NULL DEFAULT 'MONTHLY', \`gracePeriod\` int NOT NULL DEFAULT '0', \`startDate\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`endDate\` datetime NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tenancies\` (\`id\` varchar(36) NOT NULL, \`buildingId\` varchar(255) NOT NULL, \`unitId\` varchar(255) NOT NULL, \`tenantId\` varchar(255) NOT NULL, \`startDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`endDate\` datetime(6) NULL, UNIQUE INDEX \`IDX_763c36d7be9e0a8f2321c5c839\` (\`tenantId\`), UNIQUE INDEX \`REL_726f850d69e27a95d7924bd343\` (\`unitId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`next_of_kin\` (\`id\` varchar(36) NOT NULL, \`firstName\` varchar(100) NOT NULL, \`lastName\` varchar(100) NOT NULL, \`relationship\` enum ('Spouse', 'Parent', 'Sibling', 'Friend', 'Other') NOT NULL, \`phoneNumber\` varchar(15) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`firstName\` varchar(100) NOT NULL, \`lastName\` varchar(100) NOT NULL, \`idNumber\` bigint NOT NULL, \`phone\` varchar(15) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`roleId\` varchar(255) NOT NULL, \`refreshToken\` varchar(500) NULL, \`refreshTokenExpiry\` timestamp NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, INDEX \`IDX_5372672fbfd1677205e0ce3ece\` (\`firstName\`), UNIQUE INDEX \`IDX_400332f5c67d8a42d92c83f113\` (\`idNumber\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`currencies\` (\`id\` varchar(36) NOT NULL, \`currency\` varchar(255) NOT NULL, \`symbol\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`units\` ADD CONSTRAINT \`FK_3f8b928bed788bea24f7461104f\` FOREIGN KEY (\`buildingId\`) REFERENCES \`buildings\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`units\` ADD CONSTRAINT \`FK_cb4d16ad5d8d72b4af76338ae79\` FOREIGN KEY (\`tenantId\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`maintenances\` ADD CONSTRAINT \`FK_f71ec2abea2bce3209b3fe78687\` FOREIGN KEY (\`requestedById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`contracts\` ADD CONSTRAINT \`FK_b4a4d997329dc6d3f3263b0f330\` FOREIGN KEY (\`tenancyId\`) REFERENCES \`tenancies\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tenancies\` ADD CONSTRAINT \`FK_44acabedcf46f8da62a2a31c837\` FOREIGN KEY (\`buildingId\`) REFERENCES \`buildings\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tenancies\` ADD CONSTRAINT \`FK_726f850d69e27a95d7924bd343a\` FOREIGN KEY (\`unitId\`) REFERENCES \`units\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tenancies\` ADD CONSTRAINT \`FK_763c36d7be9e0a8f2321c5c8398\` FOREIGN KEY (\`tenantId\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`next_of_kin\` ADD CONSTRAINT \`FK_7b24007fdb566bd0645a706f44e\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``);
        await queryRunner.query(`ALTER TABLE \`next_of_kin\` DROP FOREIGN KEY \`FK_7b24007fdb566bd0645a706f44e\``);
        await queryRunner.query(`ALTER TABLE \`tenancies\` DROP FOREIGN KEY \`FK_763c36d7be9e0a8f2321c5c8398\``);
        await queryRunner.query(`ALTER TABLE \`tenancies\` DROP FOREIGN KEY \`FK_726f850d69e27a95d7924bd343a\``);
        await queryRunner.query(`ALTER TABLE \`tenancies\` DROP FOREIGN KEY \`FK_44acabedcf46f8da62a2a31c837\``);
        await queryRunner.query(`ALTER TABLE \`contracts\` DROP FOREIGN KEY \`FK_b4a4d997329dc6d3f3263b0f330\``);
        await queryRunner.query(`ALTER TABLE \`maintenances\` DROP FOREIGN KEY \`FK_f71ec2abea2bce3209b3fe78687\``);
        await queryRunner.query(`ALTER TABLE \`units\` DROP FOREIGN KEY \`FK_cb4d16ad5d8d72b4af76338ae79\``);
        await queryRunner.query(`ALTER TABLE \`units\` DROP FOREIGN KEY \`FK_3f8b928bed788bea24f7461104f\``);
        await queryRunner.query(`DROP TABLE \`currencies\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_400332f5c67d8a42d92c83f113\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_5372672fbfd1677205e0ce3ece\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`next_of_kin\``);
        await queryRunner.query(`DROP INDEX \`REL_726f850d69e27a95d7924bd343\` ON \`tenancies\``);
        await queryRunner.query(`DROP INDEX \`IDX_763c36d7be9e0a8f2321c5c839\` ON \`tenancies\``);
        await queryRunner.query(`DROP TABLE \`tenancies\``);
        await queryRunner.query(`DROP TABLE \`contracts\``);
        await queryRunner.query(`DROP TABLE \`maintenances\``);
        await queryRunner.query(`DROP TABLE \`buildings\``);
        await queryRunner.query(`DROP TABLE \`amenities\``);
        await queryRunner.query(`DROP INDEX \`IDX_7085292b5b7d37930fb3e87b1c\` ON \`units\``);
        await queryRunner.query(`DROP TABLE \`units\``);
        await queryRunner.query(`DROP INDEX \`IDX_a87cf0659c3ac379b339acf36a\` ON \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
    }

}
