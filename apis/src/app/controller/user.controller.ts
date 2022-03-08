import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import UsersService from '../service/user.service';
import * as Joi from 'joi';
import { JoiValidate } from '../../utils';
import AdminGuard from '../guards/admin.guard';
import AuthGuard from "../guards/auth.guard";

@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login')
  async login(@Body() body) {
    const { email, password } = JoiValidate(LoginSchema, body);
    return this.usersService.login({ email, password });
  }

  @Post('/signup')
  async signup(@Body() body) {
    const { name, email, password } = JoiValidate(SignupSchema, body);
    return this.usersService.signup({ email, password, name });
  }

  @UseGuards(AdminGuard)
  @Get('')
  async get(@Query() query, @Req() req) {
    return this.usersService.get(query.page, req.user);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getUserById(@Query() query, @Param('id') id: string, @Req() req) {
    return this.usersService.getUserById(id, req.user);
  }

  @UseGuards(AdminGuard)
  @Post('')
  async add(@Body() body, @Req() req) {
    const { name, email, password, isAdmin, dailyCalorieLimit, monthlyBudget } = JoiValidate(UserSchema, body);
    return this.usersService.add({ name, email, password, isAdmin, dailyCalorieLimit, monthlyBudget }, req.user);
  }

  @UseGuards(AdminGuard)
  @Delete('/:id')
  async delete(@Param("id") id: string, @Req() req) {
    return this.usersService.delete(id, req.user);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  async update(@Param("id") id: string, @Body() body, @Req() req) {
    const { name, email, password, isAdmin, dailyCalorieLimit, monthlyBudget } = JoiValidate(UserUpdateSchema, body);
    return this.usersService.update(id,{ name, email, password, isAdmin, dailyCalorieLimit, monthlyBudget }, req.user);
  }


}

const LoginSchema = Joi.object({
  password: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
});

const SignupSchema = LoginSchema.keys({
  name: Joi.string().min(4).required(),
});

const UserSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().min(1).required(),
  password: Joi.string().min(4).required(),
  isAdmin: Joi.boolean().required(),
  dailyCalorieLimit: Joi.number().min(100).max(3000).required(),
  monthlyBudget: Joi.number().min(500).max(10000).required()
})

const UserUpdateSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().min(1).required(),
  password: Joi.string(),
  isAdmin: Joi.boolean().required(),
  dailyCalorieLimit: Joi.number().min(100).max(3000).required(),
  monthlyBudget: Joi.number().min(100).max(10000).required()
})