import { MigrationInterface, QueryRunner } from "typeorm";

export class generate1678755377357 implements MigrationInterface {
    name = 'generate1678755377357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" ADD "talkId" uuid`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_bcdce2f65bb3c0dd150c46ec4a3" FOREIGN KEY ("talkId") REFERENCES "talks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_bcdce2f65bb3c0dd150c46ec4a3"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "talkId"`);
    }

}
