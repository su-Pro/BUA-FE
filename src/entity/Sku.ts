import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sku", { schema: "bua_real" })
export class Sku {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("decimal", {
    name: "price",
    comment: "原价",
    unsigned: true,
    precision: 10,
    scale: 2,
  })
  price: string;

  @Column("decimal", {
    name: "discount_price",
    nullable: true,
    comment: "折扣价",
    unsigned: true,
    precision: 10,
    scale: 2,
  })
  discount_price: string | null;

  @Column("varchar", {
    name: "title",
    nullable: true,
    comment: "描述title",
    length: 255,
  })
  title: string | null;

  @Column("varchar", {
    name: "sub_title",
    nullable: true,
    comment: "附加描述信息",
    length: 255,
  })
  sub_title: string | null;

  @Column("varchar", {
    name: "img",
    nullable: true,
    comment: "描述图片",
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

  @Column("int", {
    name: "category_id",
    nullable: true,
    comment: "隶属的分类",
    unsigned: true,
  })
  category_id: number | null;

  @Column("tinyint", {
    name: "online",
    comment: "是否上线",
    unsigned: true,
    default: () => "'1'",
  })
  online: number;

  @Column("int", {
    name: "stock",
    comment: "库存量",
    unsigned: true,
    default: () => "'0'",
  })
  stock: number;

  /**
   * 返回真实价格，需要处理带两种价格的情况
   */
  getRealPrice() {
    return this.discount_price? (+this.discount_price) : (+this.price)
  }
}
