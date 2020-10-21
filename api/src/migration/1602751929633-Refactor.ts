import {MigrationInterface, QueryRunner} from "typeorm";

export class Refactor1602751929633 implements MigrationInterface {
    name = 'Refactor1602751929633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "by" ("id" SERIAL NOT NULL, "navn" character varying, "bilde" character varying, CONSTRAINT "PK_5062ca00fee59e308bea2035467" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "studentby" ("id" SERIAL NOT NULL, "navn" character varying, "utleier" character varying, "bilde" character varying, "vurderingTotal" numeric, "vurderingPris" numeric, "vurderingLokasjon" numeric, "vurderingFellesAreal" numeric, "vurderingTilstand" numeric, "byId" integer, CONSTRAINT "PK_9ca50ee94122ac020d7f3c90285" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "anmeldelse_boligtype_enum" AS ENUM('parbolig', 'enebolig', 'dublett', 'kollektiv')`);
        await queryRunner.query(`CREATE TABLE "anmeldelse" ("id" SERIAL NOT NULL, "tekst" character varying(1000), "aarStart" integer, "aarSlutt" integer, "vurderingPris" integer, "vurderingLokasjon" integer, "vurderingFellesAreal" integer, "vurderingTilstand" integer, "boligtype" "anmeldelse_boligtype_enum" NOT NULL DEFAULT 'kollektiv', "datoPostet" TIMESTAMP NOT NULL DEFAULT now(), "studentbyId" integer, CONSTRAINT "PK_fdd2ef224acd689bdb43d55380d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "studentby" ADD CONSTRAINT "FK_9443f0c732713c0146988f8104d" FOREIGN KEY ("byId") REFERENCES "by"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "anmeldelse" ADD CONSTRAINT "FK_89be6defab876c4b830f230732e" FOREIGN KEY ("studentbyId") REFERENCES "studentby"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "anmeldelse" DROP CONSTRAINT "FK_89be6defab876c4b830f230732e"`);
        await queryRunner.query(`ALTER TABLE "studentby" DROP CONSTRAINT "FK_9443f0c732713c0146988f8104d"`);
        await queryRunner.query(`DROP TABLE "anmeldelse"`);
        await queryRunner.query(`DROP TYPE "anmeldelse_boligtype_enum"`);
        await queryRunner.query(`DROP TABLE "studentby"`);
        await queryRunner.query(`DROP TABLE "by"`);
    }

}
