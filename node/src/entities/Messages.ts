import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import Users from "./Users";

@Entity("messages")
class Messages {
  @PrimaryColumn("uuid")
  id: string;

  @Column("uuid")
  admin_id?: string;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => Users)
  user: Users;

  @Column("uuid")
  user_id: string;

  @Column("varchar")
  text: string;

  @CreateDateColumn()
  create_at: Date;
}

export default Messages;
