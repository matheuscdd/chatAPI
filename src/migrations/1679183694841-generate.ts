import { MigrationInterface, QueryRunner } from "typeorm";

export class generate1679183694841 implements MigrationInterface {
    name = 'generate1679183694841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(120) NOT NULL, "birthDate" date NOT NULL, "description" text, "status" character varying(20) NOT NULL DEFAULT 'active', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "password" character varying(120) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "fromId" uuid, "talkId" uuid, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "talks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, CONSTRAINT "PK_40335c0a4082e2e036902ac9d3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "talks_members_users" ("talksId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_498213b2b0b7d632baefe061592" PRIMARY KEY ("talksId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_01ae0e941ac4c028f971a924da" ON "talks_members_users" ("talksId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b5f34c80f4f9a16766448fbb80" ON "talks_members_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_627bdb88ff88b446023474e4261" FOREIGN KEY ("fromId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_bcdce2f65bb3c0dd150c46ec4a3" FOREIGN KEY ("talkId") REFERENCES "talks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "talks_members_users" ADD CONSTRAINT "FK_01ae0e941ac4c028f971a924daa" FOREIGN KEY ("talksId") REFERENCES "talks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "talks_members_users" ADD CONSTRAINT "FK_b5f34c80f4f9a16766448fbb802" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "talks_members_users" DROP CONSTRAINT "FK_b5f34c80f4f9a16766448fbb802"`);
        await queryRunner.query(`ALTER TABLE "talks_members_users" DROP CONSTRAINT "FK_01ae0e941ac4c028f971a924daa"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_bcdce2f65bb3c0dd150c46ec4a3"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_627bdb88ff88b446023474e4261"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b5f34c80f4f9a16766448fbb80"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_01ae0e941ac4c028f971a924da"`);
        await queryRunner.query(`DROP TABLE "talks_members_users"`);
        await queryRunner.query(`DROP TABLE "talks"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
