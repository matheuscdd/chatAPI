import { MigrationInterface, QueryRunner } from "typeorm";

export class generate1678647317098 implements MigrationInterface {
    name = 'generate1678647317098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "talks_members_users" ("talksId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_498213b2b0b7d632baefe061592" PRIMARY KEY ("talksId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_01ae0e941ac4c028f971a924da" ON "talks_members_users" ("talksId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b5f34c80f4f9a16766448fbb80" ON "talks_members_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "messages" ADD "fromId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_627bdb88ff88b446023474e4261" FOREIGN KEY ("fromId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "talks_members_users" ADD CONSTRAINT "FK_01ae0e941ac4c028f971a924daa" FOREIGN KEY ("talksId") REFERENCES "talks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "talks_members_users" ADD CONSTRAINT "FK_b5f34c80f4f9a16766448fbb802" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "talks_members_users" DROP CONSTRAINT "FK_b5f34c80f4f9a16766448fbb802"`);
        await queryRunner.query(`ALTER TABLE "talks_members_users" DROP CONSTRAINT "FK_01ae0e941ac4c028f971a924daa"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_627bdb88ff88b446023474e4261"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" SET DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP COLUMN "fromId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b5f34c80f4f9a16766448fbb80"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_01ae0e941ac4c028f971a924da"`);
        await queryRunner.query(`DROP TABLE "talks_members_users"`);
    }

}
