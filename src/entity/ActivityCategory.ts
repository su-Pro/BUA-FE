import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("activity_category", { schema: "bua_real" })
export class ActivityCategory {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "category_id", unsigned: true })
  category_id: number;

  @Column("int", { name: "activity_id" })
  activity_id: number;
}
