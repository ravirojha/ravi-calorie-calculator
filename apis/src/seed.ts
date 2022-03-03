import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as Bcryptjs from "bcryptjs";
import Food from "./entity/food";
import User from "./entity/user";
import * as moment from "moment";
import * as faker from 'faker';
import * as _ from 'lodash';

const bootstrap = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  await User.delete({});
  await Food.delete({});

  for(let i = 1; i < 50; i++) {
    const user = new User();
    user.name = faker.name.firstName();
    user.isAdmin = Math.random() <= 0.3;
    user.email = faker.internet.email().toLowerCase();
    user.password = Bcryptjs.hashSync("1234", 10);
    user.dailyCalorieLimit = 2100;
    user.monthlyBudget = 1000;
    await user.save();
  }

  const users = await User.find({});
  for (let i = 1; i < 51; i++) {
    const food = new Food();
    food.id = i;
    food.userId = _.sample(users).id;
    const randomDay = Math.ceil(Math.random() * 100);
    const randDate = moment().subtract(randomDay, "days");
    food.datetime = randDate.format("YYYY-MM-DD HH:mm:ss");
    food.dateMonthly = moment(randDate).format("YYYY-MM");
    food.dateDaily = moment(randDate).format("YYYY-MM-DD");
    food.name = `Food Name ${i}`;
    food.calorie = Math.floor(Math.random() * 3000) + 100;
    food.price = Math.floor(Math.random() * 100);
    await food.save();
  }
  await app.close();
};

bootstrap().then();
