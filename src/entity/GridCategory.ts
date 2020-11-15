import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("grid_category", { schema: "bua_real" })
export class GridCategory {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", {
    name: "title",
    nullable: true,
    comment: "网格分类名称，前端展示字段",
    length: 255,
  })
  title: string | null;

  @Column("varchar", {
    name: "img",
    nullable: true,
    comment: "对应的icon图片",
    length: 255,
  })
  img: string | null;

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

  @Column("datetime", {
    name: "delete_time",
    nullable: true,
    comment: "不属于核心业务数据，因此可以硬删除",
  })
  delete_time: Date | null;

  @Column("int", { name: "category_id", nullable: true, comment: "对应的分类" })
  category_id: number | null;
}
