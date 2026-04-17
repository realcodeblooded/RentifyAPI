import { MigrationInterface, QueryRunner } from "typeorm";

export class FixPropertyOwnerId1776351654835 implements MigrationInterface {
  name = "FixPropertyOwnerId1776351654835";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`properties\` ADD COLUMN \`propertyOwnerId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`properties\` ADD CONSTRAINT \`FK_properties_propertyOwnerId_users_id\` FOREIGN KEY (\`propertyOwnerId\`) REFERENCES \`users\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`properties\` DROP FOREIGN KEY \`FK_properties_propertyOwnerId_users_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`properties\` DROP COLUMN \`propertyOwnerId\``,
    );
  }
}
