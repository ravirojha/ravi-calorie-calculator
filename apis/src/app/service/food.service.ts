import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { Between, FindCondition, getRepository, MoreThan } from "typeorm";
import food from "../../entity/food";
import Food from "../../entity/food";
import { PageSize } from "../../utils";
import User from "../../entity/user";
import * as moment from "moment";

@Injectable()
export default class FoodService {
  async get(p: string, { fromDate, toDate }, authUser) {
    const user = await User.find({
      select: ["id", "dailyCalorieLimit", "monthlyBudget", "email"],
    });

    const query: FindCondition<Food> = {};
    if (fromDate && toDate) query.datetime = Between(fromDate, toDate);
    const page = Math.max(Number(p) || 1, 1);

    if (!authUser.isAdmin) query.userId = authUser.id;
    const foods = await Food.find({
      where: query,
      take: PageSize,
      skip: (page - 1) * PageSize,
      order: { datetime: "DESC" },
    });

    const userMap = {};
    user.forEach(particularUser => {
      userMap[particularUser.id] = particularUser;
    });

    const dailyCalorieConsumed = await getRepository(Food)
      .createQueryBuilder("food")
      .select("SUM(food.calorie)", "sum")
      .addSelect("food.dateDaily")
      .addSelect("food.userId")
      .groupBy("food.dateDaily")
      .addGroupBy("food.userId")
      .having(fromDate ? "food.datetime > :startDate" : "1=1", { startDate: `${fromDate}` })
      .andHaving(toDate ? "food.datetime < :endDate" : "1=1", { endDate: `${toDate}` })
      .getRawMany();

    const monthlyBudgetConsumed = await getRepository(Food)
      .createQueryBuilder("food")
      .select("SUM(food.price)", "sum")
      .addSelect("food.dateMonthly")
      .addSelect("food.userId")
      .groupBy("food.dateMonthly")
      .addGroupBy("food.userId")
      .having(fromDate ? "food.datetime > :startDate" : "1=1", { startDate: `${fromDate}` })
      .andHaving(toDate ? "food.datetime < :endDate" : "1=1", { endDate: `${toDate}` })
      .getRawMany();

    const users = await getRepository(User).createQueryBuilder("user").select(["user.id", "user.dailyCalorieLimit", "user.monthlyBudget"]).getRawMany();
    // console.log(foods,'=============================');
    const foodsTemp = foods.map(async f => {
      dailyCalorieConsumed.forEach(dcc => {
        if (dcc?.food_dateDaily === f.dateDaily && dcc?.food_userId === f.userId) f["dailyCalorieSum"] = dcc?.sum;
      });

      monthlyBudgetConsumed.forEach(mbc => {
        if (mbc?.food_dateMonthly === f.dateMonthly && mbc?.food_userId === f.userId) f["monthlyBudgetSum"] = mbc?.sum;
      });

      f["dailyCalorieLimit"] = userMap[f.userId].dailyCalorieLimit;
      f["monthlyBudget"] = userMap[f.userId].monthlyBudget;
      f["userEmail"] = userMap[f.userId].email;

      delete f["dateDaily"];
      delete f["dateMonthly"];
      return f;
    });


    const foodData = await Promise.all(foodsTemp).then(res => res);

    const totalFoodCount = await Food.count({ where: query });

    const pageCount = Math.ceil(totalFoodCount / PageSize);
    return { foodData, page, pageCount };
  }

  async add({ datetime, name, calorie, price, userEmail }, authUser) {
    const food = new Food();
    let user;
    if (authUser.isAdmin && userEmail) {
      user = await User.findOne({
        where: {
          email: userEmail.toLowerCase(),
        },
      });
      if (!user) throw new HttpException("No user exists with given email", 400);
      food.userId = user.id;
    } else {
      food.userId = authUser.id;
    }
    if (!user) user = await User.findOne(authUser.id);

    food.datetime = datetime;
    food.dateMonthly = moment(datetime).format("YYYY-MM");
    food.dateDaily = moment(datetime).format("YYYY-MM-DD");
    food.name = name;
    food.calorie = calorie;
    food.price = price;

    await food.save();

    const foodDataDaily = await Food.find({ where: { dateDaily: moment(datetime).format("YYYY-MM-DD"), userId: user.id } });
    const foodDataMonthly = await Food.find({ where: { dateMonthly: moment(datetime).format("YYYY-MM"), userId: user.id } });
    const totalCalorie = foodDataDaily.reduce((prev, curr) => prev + curr.calorie, 0);
    const totalBudget = foodDataMonthly.reduce((prev, curr) => prev + curr.price, 0);
    food["calorieReached"] = totalCalorie > user.dailyCalorieLimit;
    food["budgetReached"] = totalBudget > user.monthlyBudget;
    return food;
  }

  async delete(id: string, authUser) {
    const food = await Food.findOne(id);
    if (food) {
      if (food.userId === authUser.id || authUser.isAdmin) {
        await Food.delete(id);
        return {};
      } else throw new HttpException("Permission denied", 403);
    }
    throw new NotFoundException();
  }

  async update(id: string, { datetime, name, calorie, price }, authUser) {
    const food = await Food.findOne(id);
    if (food.userId === authUser.id || authUser.isAdmin) {
      if (food) {
        let user = await User.findOne(authUser.id);
        if (authUser.isAdmin) {
          user = await User.findOne(food.userId);
        }
        food.datetime = datetime;
        food.dateMonthly = moment(datetime).format("YYYY-MM");
        food.dateDaily = moment(datetime).format("YYYY-MM-DD");
        food.name = name;
        food.calorie = calorie;
        food.price = price;
        await food.save();
        const foodDataDaily = await Food.find({ where: { dateDaily: moment(datetime).format("YYYY-MM-DD"), userId: user.id } });
        const foodDataMonthly = await Food.find({ where: { dateMonthly: moment(datetime).format("YYYY-MM"), userId: user.id } });
        const totalCalorie = foodDataDaily.reduce((prev, curr) => prev + curr.calorie, 0);
        const totalBudget = foodDataMonthly.reduce((prev, curr) => prev + curr.price, 0);
        food["calorieReached"] = totalCalorie > user.dailyCalorieLimit;
        food["budgetReached"] = totalBudget > user.monthlyBudget;
        console.log(food, "====================================================");
        console.log(foodDataDaily, totalCalorie, user.dailyCalorieLimit);
        return food;
      } else throw new NotFoundException();
    } else throw new HttpException("Permission denied", 403);
  }

  async getReports() {
    const date = new Date();
    const week = new Date();
    week.setDate(date.getDate() - 7);
    const before = new Date();
    before.setDate(date.getDate() - 14);
    const reports = {};
    reports["foodLastWeek"] = await Food.find({
      where: {
        datetime: MoreThan(week.toISOString()),
      },
    });
    reports["foodWeekBeforeThat"] = await Food.find({
      where: {
        datetime: Between(before.toISOString(), week.toISOString()),
      },
    });

    let totalCal = 0;
    const len = reports["foodLastWeek"].length;
    for (let i = 0; i < len; i++) {
      totalCal += reports["foodLastWeek"][i].calorie;
    }
    reports["avgCalorie"] = totalCal ? (totalCal / len).toFixed(2) : 0;
    return reports;
  }
}
