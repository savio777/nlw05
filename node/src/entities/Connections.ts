import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import Users from "./Users";

@Entity("connections")
class Connections {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar")
  admin_id?: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => Users)
  user: Users;

  @Column("uuid")
  user_id: string;

  @Column("varchar")
  socket_id: string;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}

export default Connections;
