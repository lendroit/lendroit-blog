import {MigrationInterface, QueryRunner} from "typeorm";

export class catalog1543262299281 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "catalog" ("entityName" character varying NOT NULL, "ids" json NOT NULL, CONSTRAINT "PK_8a04899f7bd91941a458bd84325" PRIMARY KEY ("entityName"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "catalog"`);
    }

}
