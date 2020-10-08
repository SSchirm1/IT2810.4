import {MigrationInterface, QueryRunner} from "typeorm";

export class NullableColumns1602140040061 implements MigrationInterface {
    name = 'NullableColumns1602140040061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "by" ALTER COLUMN "navn" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studentby" ALTER COLUMN "navn" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studentby" ALTER COLUMN "utleier" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studentby" ALTER COLUMN "bilde" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "aar" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "aar" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studentby" ALTER COLUMN "bilde" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studentby" ALTER COLUMN "utleier" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "studentby" ALTER COLUMN "navn" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "by" ALTER COLUMN "navn" SET NOT NULL`);
    }

}
