import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import FoodController from './app/controller/food.controller';
import FoodService from './app/service/food.service';
import Food from './entity/food';
import User from './entity/user';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'sqlite.db',
      synchronize: true,
      entities: [User, Food],
      logging: true,
    }),
  ],
  controllers: [FoodController],
  providers: [FoodService],
})
export class AppModule {}
