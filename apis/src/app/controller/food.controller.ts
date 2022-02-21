import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { JoiValidate } from "../../utils";
import FoodService from "../service/food.service";
import * as Joi from "joi";
import AuthGuard from "../guards/auth.guard";
import AdminGuard from "../guards/admin.guard";
import * as moment from "moment";

@Controller("")
export default class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @UseGuards(AuthGuard)
  @Get("/food")
  async get(@Query() query, @Req() req) {
    let { startDate, endDate } = query;
    if (query.startDate && query.endDate) {
      // console.log(query)
      ({ startDate, endDate } = validateDates(query.startDate, query.endDate));
    }
    return this.foodService.get(query.page, { fromDate: startDate, toDate: endDate }, req.user);
  }

  @UseGuards(AdminGuard)
  @Get("/food/report")
  async getReports() {
    return this.foodService.getReports();
  }

  @UseGuards(AuthGuard)
  @Post("/food")
  async add(@Body() body, @Req() req) {
    const { datetime, name, calorie, price, userEmail } = JoiValidate(FoodSchema, body);
    return this.foodService.add({ datetime, name, calorie, price, userEmail }, req.user);
  }

  @UseGuards(AuthGuard)
  @Get("/user/loggedin")
  async getLoggedInUser(@Req() req) {
    return {
      ...req.user,
      token: req.token,
    };
  }

  @UseGuards(AuthGuard)
  @Delete("/food/:id")
  async delete(@Param("id") id: string, @Req() req) {
    return this.foodService.delete(id, req.user);
  }

  @UseGuards(AuthGuard)
  @Put("/food/:id")
  async update(@Param("id") id: string, @Body() body, @Req() req) {
    const { datetime, name, calorie, price } = JoiValidate(FoodSchema, body);
    return this.foodService.update(
      id,
      {
        datetime,
        name,
        calorie,
        price,
      },
      req.user,
    );
  }
}

const FoodSchema = Joi.object({
  datetime: Joi.string().custom((val, handler) => customValidator(val, handler)), //string , custom validator
  name: Joi.string().min(4).required(),
  calorie: Joi.number().min(1).max(5000).required(),
  price: Joi.number().min(1).max(1000).required(),
  userEmail: Joi.string().email().allow(null),
});

const FilterSchema = Joi.object({
  startDate: Joi.string().custom(customValidator),
  endDate: Joi.string().custom(customValidator),
});

function validateDates(startDate, endDate) {
  if (startDate > moment().add(1, "day").format() || endDate > moment().add(1, "day").format()) {
    throw new HttpException("Date cannot start after present day", 400);
  } else if (startDate > endDate) {
    throw new HttpException("End Date cannot be Greater than Start Date", 400);
  } else return JoiValidate(FilterSchema, { startDate, endDate });
}

function customValidator(val, handler) {
  console.log(val);
  const date = moment(val).format("YYYY-MM-DD HH:mm:ss");
  console.log(date);
  if (date < moment().add(1, "day").format("YYYY-MM-DD HH:mm:ss")) {
    return val;
  } else {
    return handler.error("Date in format YYYY-MM-DD HH-mm-ss is only accepted");
  }
}
