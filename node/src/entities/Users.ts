import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
class Users {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar")
  email: string;

  @CreateDateColumn()
  create_at: Date;
}

export default Users;
