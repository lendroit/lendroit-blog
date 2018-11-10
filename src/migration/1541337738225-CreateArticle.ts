import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateArticle1541337738225 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'article',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'character varying' },
          { name: 'isPublished', type: 'boolean' },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('article');
  }
}
