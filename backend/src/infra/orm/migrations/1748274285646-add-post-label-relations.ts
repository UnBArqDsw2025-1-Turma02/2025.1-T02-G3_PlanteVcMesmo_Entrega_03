import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPostLabelRelations implements MigrationInterface {
    name = 'AddPostLabelRelations1748274285646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post_labels" ("post_id" uuid NOT NULL, "label_id" uuid NOT NULL, CONSTRAINT "PK_7c757f781b2c40b37e6456600a3" PRIMARY KEY ("post_id", "label_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_01bf3fa5405b7d195311463ea2" ON "post_labels" ("post_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_fc187e2acc6803c015d7adf9e6" ON "post_labels" ("label_id") `);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "label" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_labels" ADD CONSTRAINT "FK_01bf3fa5405b7d195311463ea22" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_labels" ADD CONSTRAINT "FK_fc187e2acc6803c015d7adf9e69" FOREIGN KEY ("label_id") REFERENCES "label"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_labels" DROP CONSTRAINT "FK_fc187e2acc6803c015d7adf9e69"`);
        await queryRunner.query(`ALTER TABLE "post_labels" DROP CONSTRAINT "FK_01bf3fa5405b7d195311463ea22"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"`);
        await queryRunner.query(`ALTER TABLE "label" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fc187e2acc6803c015d7adf9e6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_01bf3fa5405b7d195311463ea2"`);
        await queryRunner.query(`DROP TABLE "post_labels"`);
    }

}
