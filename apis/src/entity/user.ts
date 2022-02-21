import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user ' })
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn() id: number;
    @Column({ default: false }) isAdmin: boolean;
    @Column() email: string;
    @Column({ select: false }) password: string;
    @Column() dailyCalorieLimit: number;
    @Column() monthlyBudget: number;
}