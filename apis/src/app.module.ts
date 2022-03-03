import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import FoodController from './app/controller/food.controller';
import FoodService from './app/service/food.service';
import Food from './entity/food';
import User from './entity/user';
import { AppController } from "./app.controller";
import UsersController from "./app/controller/user.controller";
import UsersService from "./app/service/user.service";
import { AppService } from "./app.service";

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
  controllers: [AppController,FoodController,UsersController],
  providers: [AppService,FoodService,UsersService],
})
export class AppModule {}
