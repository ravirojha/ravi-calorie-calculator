import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user ' })
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;
    @Column() name: string;
    @Column({ default: false }) isAdmin: boolean;
    @Column() email: string;
    @Column({ select: false }) password: string;
    @Column({default: 2100}) dailyCalorieLimit: number;
    @Column({default: 1000}) monthlyBudget: number;
}