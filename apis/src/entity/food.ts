import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user";

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

  @ManyToOne(() => User, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}
