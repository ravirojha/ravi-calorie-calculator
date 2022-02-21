import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import User from "./entity/user";

const bootstrap = async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  // await User.update({ id: 1 }, { dailyCalorieLimit: 2500, monthlyBudget: 1500 });
  await User.update({ id: 2 }, { dailyCalorieLimit: 2500, monthlyBudget: 1500 });
  await app.close();
};

bootstrap().then();
