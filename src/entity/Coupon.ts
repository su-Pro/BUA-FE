import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Category } from './Category';

@Entity("coupon", { schema: "bua_real" })
export class Coupon {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "title", nullable: true, length: 255 })
  title: string | null;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description: string | null;

  @Column("smallint", {
    name: "type",
    comment: "1. 满减券 2.折扣券 3.无门槛券 4.满金额折扣券",
  })
  type: number;

  @Column("datetime", {
    name: "start_time",
    nullable: true,
    comment: "有效期上线",
  })
  start_time: Date | null;

  @Column("datetime", {
    name: "end_time",
    nullable: true,
    comment: "有效期截止时间",
  })
  end_time: Date | null;

  @Column("tinyint", {
    name: "whole_store",
    nullable: true,
    comment: "标识是否为全场通用类型",
    unsigned: true,
    default: () => "'0'",
  })
  whole_store: number | null;

  @Column("decimal", {
    name: "full_money",
    nullable: true,
    comment: "使用优惠券时的条件：满足多少钱",
    precision: 10,
    scale: 2,
  })
  full_money: string | null;

  @Column("decimal", {
    name: "minus",
    nullable: true,
    comment: "减免多少钱",
    precision: 10,
    scale: 2,
  })
  minus: string | null;

  @Column("decimal", {
    name: "rate",
    nullable: true,
    comment: "打多少折",
    precision: 10,
    scale: 2,
  })
  rate: string | null;

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

  @Column("tinyint", {
    name: "online",
    nullable: true,
    comment: "标识是否上线",
    default: () => "'1'",
  })
  online: number | null;

  @Column("int", {
    name: "activity_id",
    nullable: true,
    comment: "隶属于的品类",
    unsigned: true,
  })
  activity_id: number | null;
  @ManyToMany(
    type => User,
    user => user.id,
  )
  @JoinTable({
    name: 'user_coupon',
    joinColumns: [{ name: 'coupon_id' }],
    inverseJoinColumns: [{ name: 'user_id' }],
  })
  user: User[];
  @ManyToMany(
    type => Category,
    category => category.id,
  )
  @JoinTable({
    name: 'coupon_category',
    joinColumns: [{ name: 'coupon_id' }],
    inverseJoinColumns: [{ name: 'category_id' }],
  })
  categoryList: Category[];

}
