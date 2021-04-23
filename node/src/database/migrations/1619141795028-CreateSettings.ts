import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSettings1619141795028 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // para corrigir:
    // QueryFailedError: function uuid_generate_v4() does not exist
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: "settings",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            // para alguns bancos de dados como
            // sqlite não dá certo
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          { name: "username", type: "varchar", isNullable: false },
          { name: "chat", type: "boolean", default: true },
          { name: "update_at", type: "timestamp", default: "now()" },
          { name: "create_at", type: "timestamp", default: "now()" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("settings");
  }
}
