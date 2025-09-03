import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsActiveToUser1717481000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`isActive\``);
  }
}
