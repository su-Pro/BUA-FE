import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uni_order_no", ["order_no"], { unique: true })
@Entity("order", { schema: "bua_real" })
export class Order {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", {
    name: "order_no",
    nullable: true,
    unique: true,
    length: 20,
  })
  order_no: string | null;

  @Column("varchar", {
    name: "prepay_id",
    nullable: true,
    comment: "支付id号",
    length: 255,
  })
  prepay_id: string | null;

  @Column("int", {
    name: "user_id",
    nullable: true,
    comment: "user表外键",
    unsigned: true,
  })
  user_id: number | null;

  @Column("tinyint", {
    name: "status",
    nullable: true,
    comment: "标识订单状态 1：待支付 2： 待发货 3： 待收获 4：完成",
    unsigned: true,
    default: () => "'1'",
  })
  status: number | null;

  @Column("datetime", {
    name: "create_time",
    nullable: true,
    comment: "订单创建日期",
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
    name: "expired_time",
    nullable: true,
    comment: "过期日期",
  })
  expired_time: Date | null;

  @Column("datetime", {
    name: "placed_time",
    nullable: true,
    comment: "支付日期",
  })
  placed_time: Date | null;

  @Column("varchar", {
    name: "snap_img",
    nullable: true,
    comment: "快照的图片，主要用来前端展示",
    length: 255,
  })
  snap_img: string | null;

  @Column("varchar", {
    name: "snap_title",
    nullable: true,
    comment: "快照的标题描述",
    length: 255,
  })
  snap_title: string | null;

  @Column("json", {
    name: "snap_items",
    nullable: true,
    comment: "快照中对应的商品信息",
  })
  snap_items: object | null;

  @Column("json", {
    name: "snap_address",
    nullable: true,
    comment: "快照的地址",
  })
  snap_address: object | null;

  @Column("decimal", {
    name: "total_price",
    nullable: true,
    comment: "生成订单时的总价",
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  total_price: string | null;

  @Column("int", {
    name: "total_count",
    nullable: true,
    comment: "订单的总数量",
    unsigned: true,
    default: () => "'0'",
  })
  total_count: number | null;

  @Column("decimal", {
    name: "final_total_price",
    nullable: true,
    comment: "最终支付的订单价格",
    precision: 10,
    scale: 2,
  })
  final_total_price: string | null;
}
