import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1541633381045 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL,
      CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "article" ALTER COLUMN "content" DROP DEFAULT`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "article" ALTER COLUMN "content" SET DEFAULT 'NO_CONTENT'`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
