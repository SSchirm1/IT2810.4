import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1602135905252 implements MigrationInterface {
    name = 'InitialMigration1602135905252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "by" ("id" SERIAL NOT NULL, "navn" character varying NOT NULL, "bilde" character varying, "path" character varying, CONSTRAINT "PK_5062ca00fee59e308bea2035467" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "studentby" ("id" SERIAL NOT NULL, "navn" character varying NOT NULL, "utleier" character varying NOT NULL, "bilde" character varying NOT NULL, "vurderingTotal" numeric, "vurderingPris" numeric, "vurderingLokasjon" numeric, "vurderingFellesAreal" numeric, "vurderingTilstand" numeric, "path" character varying, "byId" integer, CONSTRAINT "PK_9ca50ee94122ac020d7f3c90285" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "review_boligtype_enum" AS ENUM('parbolig', 'enebolig', 'dublett', 'kollektiv')`);
        await queryRunner.query(`CREATE TABLE "review" ("id" SERIAL NOT NULL, "tittel" character varying, "kommentar" character varying(1000), "aar" integer NOT NULL, "antall" integer, "vurderingPris" integer, "vurderingLokasjon" integer, "vurderingFellesAreal" integer, "vurderingTilstand" integer, "boligtype" "review_boligtype_enum" NOT NULL DEFAULT 'kollektiv', "postedAt" TIMESTAMP NOT NULL DEFAULT now(), "studentbyId" integer, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "studentby" ADD CONSTRAINT "FK_9443f0c732713c0146988f8104d" FOREIGN KEY ("byId") REFERENCES "by"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_47ac8cb12f20c44e7ce15cf7214" FOREIGN KEY ("studentbyId") REFERENCES "studentby"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_47ac8cb12f20c44e7ce15cf7214"`);
        await queryRunner.query(`ALTER TABLE "studentby" DROP CONSTRAINT "FK_9443f0c732713c0146988f8104d"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TYPE "review_boligtype_enum"`);
        await queryRunner.query(`DROP TABLE "studentby"`);
        await queryRunner.query(`DROP TABLE "by"`);
    }

}
