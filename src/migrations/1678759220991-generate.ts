import { MigrationInterface, QueryRunner } from "typeorm";

export class generate1678759220991 implements MigrationInterface {
    name = 'generate1678759220991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "talks" DROP COLUMN "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "talks" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
