import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateConnections1619326612169 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "connections",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          { name: "admin_id", type: "varchar", isNullable: true },
          { name: "user_id", type: "uuid" },
          { name: "socket_id", type: "varchar" },
          { name: "update_at", type: "timestamp", default: "now()" },
          { name: "create_at", type: "timestamp", default: "now()" },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "connections",
      new TableForeignKey({
        name: "FKConnectUser",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // deve remover a foreign key de forma manual no revert pelo
    // fato da key ter sido feita fora do new Table
    await queryRunner.dropForeignKey("connections", "FKConnectUser");
    await queryRunner.dropTable("connections");
  }
}
