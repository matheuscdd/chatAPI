import { MigrationInterface, QueryRunner } from "typeorm";

export class generate1678722765075 implements MigrationInterface {
    name = 'generate1678722765075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "talks" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "talks" ADD "createdAt" TIME NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "talks" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "talks" ADD "updatedAt" TIME NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "talks" DROP COLUMN "deleteAt"`);
        await queryRunner.query(`ALTER TABLE "talks" ADD "deleteAt" TIME`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIME NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIME NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleteAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleteAt" TIME`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "text" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "createdAt" TIME NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "createdAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD "text" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleteAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleteAt" date`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "talks" DROP COLUMN "deleteAt"`);
        await queryRunner.query(`ALTER TABLE "talks" ADD "deleteAt" date`);
        await queryRunner.query(`ALTER TABLE "talks" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "talks" ADD "updatedAt" date NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "talks" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "talks" ADD "createdAt" date NOT NULL DEFAULT now()`);
    }

}
