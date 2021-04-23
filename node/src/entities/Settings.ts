import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from "typeorm";
//import { v4 as uuid } from "uuid";

@Entity("settings")
class Settings {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar")
  username: string;

  @Column("boolean")
  chat: boolean;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  create_at: Date;

  /*constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }*/
}

export default Settings;
