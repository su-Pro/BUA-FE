import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { classToPlain, Exclude } from 'class-transformer';

@Entity("theme", { schema: "bua_real" })
export class Theme {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "用于检索主题 -> CMS",
    length: 30,
  })
  name: string | null;

  @Column("varchar", {
    name: "tpl_name",
    nullable: true,
    comment: "创建模板主题 -> CMS",
    length: 30,
  })
  tpl_name: string | null;

  @Column("varchar", {
    name: "title",
    nullable: true,
    comment: "前端展示主题名称",
    length: 60,
  })
  title: string | null;

  @Column("varchar", {
    name: "description",
    nullable: true,
    comment: "前端展示描述信息",
    length: 255,
  })
  description: string | null;

  @Column("varchar", {
    name: "entrance_img",
    nullable: true,
    comment: "前端展示入口图片",
    length: 255,
  })
  entrance_img: string | null;

  @Column("varchar", {
    name: "inner_top_img",
    nullable: true,
    comment: "前端展示详情顶图",
    length: 255,
  })
  inner_top_img: string | null;

  @Column("varchar", {
    name: "title_img",
    nullable: true,
    comment: "前端展示详情title文案图片",
    length: 255,
  })
  title_img: string | null;

  @Column("tinyint", {
    name: "online",
    nullable: true,
    comment: "标识是否上线 -> CMS",
    unsigned: true,
    default: () => "'1'",
  })
  online: number | null;

  @Exclude({ toPlainOnly: true })
  @Column("datetime", {
    name: "create_time",
    nullable: true,
    default: () => "'CURRENT_TIMESTAMP(3)'",
  })
  create_time: Date | null;
  @Exclude({ toPlainOnly: true })
  @Column("datetime", {
    name: "update_time",
    nullable: true,
    default: () => "'CURRENT_TIMESTAMP(3)'",
  })
  update_time: Date | null;

  @Exclude({ toPlainOnly: true })
  @Column("datetime", { name: "delete_time", nullable: true })
  delete_time: Date | null;

  toJSON() {
    return classToPlain(this);
  }
}
