import {MigrationInterface, QueryRunner} from "typeorm";

export class lifestyle1543676903471 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "lifestyle" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "imageUrl" character varying NOT NULL, "publicId" character varying NOT NULL, CONSTRAINT "PK_b0ead98daa9575b22588bb22314" PRIMARY KEY ("uuid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "lifestyle"`);
    }

}
