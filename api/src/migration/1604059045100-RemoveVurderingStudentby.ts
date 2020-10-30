import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveVurderingStudentby1604059045100 implements MigrationInterface {
    name = 'RemoveVurderingStudentby1604059045100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "studentby" DROP COLUMN "vurderingTotal"`);
        await queryRunner.query(`ALTER TABLE "studentby" DROP COLUMN "vurderingPris"`);
        await queryRunner.query(`ALTER TABLE "studentby" DROP COLUMN "vurderingLokasjon"`);
        await queryRunner.query(`ALTER TABLE "studentby" DROP COLUMN "vurderingFellesAreal"`);
        await queryRunner.query(`ALTER TABLE "studentby" DROP COLUMN "vurderingTilstand"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "studentby" ADD "vurderingTilstand" numeric`);
        await queryRunner.query(`ALTER TABLE "studentby" ADD "vurderingFellesAreal" numeric`);
        await queryRunner.query(`ALTER TABLE "studentby" ADD "vurderingLokasjon" numeric`);
        await queryRunner.query(`ALTER TABLE "studentby" ADD "vurderingPris" numeric`);
        await queryRunner.query(`ALTER TABLE "studentby" ADD "vurderingTotal" numeric`);
    }

}
