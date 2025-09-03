import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddIsActiveToUser1717481000000 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
