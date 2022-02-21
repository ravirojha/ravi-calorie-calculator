import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as Bcryptjs from "bcryptjs";
import * as _ from "lodash";
import Food from "./entity/food";
import User from "./entity/user";
import * as moment from "moment";

const bootstrap = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  await User.delete({});
  await Food.delete({});

  const admin = new User();
  admin.id = 1;
  admin.isAdmin = true;
  admin.email = "admin@example.com";
  admin.password = Bcryptjs.hashSync("1234", 10);
  admin.dailyCalorieLimit = 2100;
  admin.monthlyBudget = 1000;
  await admin.save();

  const regular = new User();
  regular.id = 2;
  regular.isAdmin = false;
  regular.email = "regular@example.com";
  regular.password = Bcryptjs.hashSync("1234", 10);
  regular.dailyCalorieLimit = 2100;
  regular.monthlyBudget = 1000;
  await regular.save();

  for (let i = 1; i < 51; i++) {
    const food = new Food();
    const rand = Math.random() > 0.5 ? 1 : 2;
    food.id = i;
    food.userId = rand;
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
