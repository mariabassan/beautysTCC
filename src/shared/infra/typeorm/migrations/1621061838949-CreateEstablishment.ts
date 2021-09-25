import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateEstablishment1621061838949 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'establishments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'cnpj',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'nomeFantasia',
            type: 'varchar',
          },
          {
            name: 'razaoSocial',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'phone',
            type: 'varchar',
          },
          {
            name: 'cep',
            type: 'varchar',
          },
          {
            name: 'endereco',
            type: 'varchar',
          },
          {
            name: 'numero',
            type: 'number',
          },
          {
            name: 'cidade',
            type: 'varchar',
          },
          {
            name: 'uf',
            type: 'varchar',
          },
          {
            name: 'ramo',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('establishments');
  }
}

