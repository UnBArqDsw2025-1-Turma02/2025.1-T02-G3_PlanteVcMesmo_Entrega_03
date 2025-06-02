import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColor implements MigrationInterface {
    name = 'AddColor1748817187261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "label" RENAME COLUMN "code" TO "color"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "label" RENAME COLUMN "color" TO "code"`);
    }

}
