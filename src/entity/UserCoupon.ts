import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uni_user_coupon", ["user_id", "coupon_id"], { unique: true })
@Entity("user_coupon", { schema: "bua_real" })
export class UserCoupon {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "user_id", unsigned: true })
  user_id: number;

  @Column("int", { name: "coupon_id", unsigned: true })
  coupon_id: number;

  @Column("int", {
    name: "order_id",
    nullable: true,
    comment: "在优惠券核销时，需要填写对应的订单号",
    unsigned: true,
  })
  order_id: number | null;

  @Column("tinyint", {
    name: "status",
    comment: "1:未使用，2：已使用， 3：已过期",
    unsigned: true,
    default: () => "'0'",
  })
  status: number;

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
