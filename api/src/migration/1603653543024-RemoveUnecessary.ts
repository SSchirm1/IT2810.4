import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveUnecessary1603653543024 implements MigrationInterface {
    name = 'RemoveUnecessary1603653543024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "by" DROP COLUMN "bilde"`);
        await queryRunner.query(`ALTER TABLE "studentby" DROP COLUMN "bilde"`);
        await queryRunner.query(`ALTER TABLE "anmeldelse" DROP COLUMN "tekst"`);
        await queryRunner.query(`ALTER TABLE "anmeldelse" DROP COLUMN "aarStart"`);
        await queryRunner.query(`ALTER TABLE "anmeldelse" DROP COLUMN "aarSlutt"`);
        await queryRunner.query(`ALTER TABLE "anmeldelse" DROP COLUMN "boligtype"`);
        await queryRunner.query(`DROP TYPE "public"."anmeldelse_boligtype_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."anmeldelse_boligtype_enum" AS ENUM('parbolig', 'enebolig', 'dublett', 'kollektiv')`);
        await queryRunner.query(`ALTER TABLE "anmeldelse" ADD "boligtype" "anmeldelse_boligtype_enum" NOT NULL DEFAULT 'kollektiv'`);
        await queryRunner.query(`ALTER TABLE "anmeldelse" ADD "aarSlutt" integer`);
        await queryRunner.query(`ALTER TABLE "anmeldelse" ADD "aarStart" integer`);
        await queryRunner.query(`ALTER TABLE "anmeldelse" ADD "tekst" character varying(1000)`);
        await queryRunner.query(`ALTER TABLE "studentby" ADD "bilde" character varying`);
        await queryRunner.query(`ALTER TABLE "by" ADD "bilde" character varying`);
    }

}
