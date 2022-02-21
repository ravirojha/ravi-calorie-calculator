import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "food" })
export default class Food extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() userId: number;
  @Column() datetime: string;
  @Column() dateMonthly: string;
  @Column() dateDaily: string;
  @Column() name: string;
  @Column() calorie: number;
  @Column() price: number;
}
