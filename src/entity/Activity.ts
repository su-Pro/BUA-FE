import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coupon } from './Coupon';

@Entity("activity", { schema: "bua_real" })
export class Activity {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", {
    name: "name",
    comment: "比id更有描述性的身份",
    length: 20,
  })
  name: string;

  @Column("varchar", { name: "title", nullable: true, length: 60 })
  title: string | null;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description: string | null;

  @Column("varchar", { name: "entrance_img", nullable: true, length: 255 })
  entrance_img: string | null;

  @Column("varchar", { name: "internal_top_img", nullable: true, length: 255 })
  internal_top_img: string | null;

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

  @Column("datetime", { name: "start_time", comment: "运营：活动开始日期" })
  start_time: Date;

  @Column("datetime", { name: "end_time", comment: "运营：活动结束日期" })
  end_time: Date;

  @Column("tinyint", {
    name: "online",
    nullable: true,
    comment: "运营：是否上线",
    unsigned: true,
    default: () => "'1'",
  })
  online: number | null;

  @OneToMany(
    type => Coupon,
    coupon => coupon.activity_id,
  )
  couponList: Coupon[];
}
