import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uni_openid", ["openid"], { unique: true })
@Entity("user", { schema: "bua_real" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", {
    name: "openid",
    nullable: true,
    unique: true,
    comment: "小程序唯一身份",
    length: 50,
  })
  openid: string | null;

  @Column("json", { name: "wx_profile", nullable: true })
  wx_profile: object | null;

  @Column("varchar", {
    name: "nickname",
    nullable: true,
    comment: "昵称",
    length: 60,
  })
  nickname: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("varchar", { name: "password", nullable: true, length: 255 })
  password: string | null;

  @Column("datetime", {
    name: "create_time",
    nullable: true,
    default: () => "'CURRENT_TIMESTAMP(3)'",
  })
  create_time: Date | null;

  @Column("datetime", {
    name: "update_time",
    nullable: true,
    default: () => "'CURRENT_TIMESTAMP(3)'",
  })
  update_time: Date | null;
}
