import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddArticleContent1541342520743 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'article',
      new TableColumn({
        name: 'createdAt',
        type: 'timestamp',
        isNullable: false,
        default: 'now()',
      }),
    );

    await queryRunner.addColumn(
      'article',
      new TableColumn({
        name: 'updatedAt',
        type: 'timestamp',
        isNullable: false,
        default: 'now()',
      }),
    );

    await queryRunner.addColumn(
      'article',
      new TableColumn({
        name: 'content',
        type: 'character varying',
        default: "'NO_CONTENT'",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropColumn('article', 'content');
    await queryRunner.dropColumn('article', 'createdAt');
    await queryRunner.dropColumn('article', 'updatedAt');
  }
}
