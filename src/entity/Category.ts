import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("category", { schema: "bua_real" })
export class Category {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", comment: "分类名称", length: 255 })
  name: string;

  @Column("varchar", {
    name: "description",
    nullable: true,
    comment: "分类的描述信息",
    length: 255,
  })
  description: string | null;

  @Column("tinyint", {
    name: "is_root",
    comment: "是否是父节点",
    unsigned: true,
    default: () => "'0'",
  })
  is_root: number;

  @Column("int", {
    name: "parent_id",
    nullable: true,
    comment: "父节点ID",
    unsigned: true,
  })
  parent_id: number | null;

  @Column("int", {
    name: "index",
    nullable: true,
    comment: "用于排序的字段",
    unsigned: true,
  })
  index: number | null;

  @Column("int", {
    name: "online",
    nullable: true,
    comment: "是否上线",
    unsigned: true,
    default: () => "'1'",
  })
  online: number | null;

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
