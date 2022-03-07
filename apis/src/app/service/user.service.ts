import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import * as Bcryptjs from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import User from '../../entity/user'
import { JwtSecret, PageSize } from '../../utils';

@Injectable()
export default class UsersService {

  async login({email, password}) {
    const user = await User.findOne({
      where: {email: email.toLowerCase() },
      select: ['id', 'name', 'email', 'isAdmin','password', 'dailyCalorieLimit', "monthlyBudget"]
    });

    if (user) {
      if (Bcryptjs.compareSync(password, user.password)) {
        return {
          ...user,
          password: undefined,
          jwt: Jwt.sign({ id: user.id }, JwtSecret, { expiresIn: '1d' }),
        };
      } else throw new HttpException('Email and password not match', 400);
    } else throw new NotFoundException();
  }

  async signup({name, email, password}) {
    let user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      user = new User();
      user.email = email.toLowerCase();
      user.password = Bcryptjs.hashSync(password, 10);
      user.name = name;
      await user.save();
      return {
        ...user,
        password: undefined,
      };
    } else throw new HttpException('Email already exists', 400);
  }

  async get(p =  '1', authUser) {
    const page = Math.max(Number(p) || 1, 1);
    const users = await User.find({
      take: PageSize,
      skip: (page - 1) * PageSize,
      order: { name: "ASC" }
    });

    const totalUserCount = await User.count();
    const pageCount = Math.ceil(totalUserCount / PageSize);

    return { users, page, pageCount };
  }

  async getUserById(id, authUser) {
    const user = await User.findOne(id);
    if (user && authUser.id == id) {
      delete user['password'];
      return user;
    } else throw new NotFoundException();
  }

  async add({ name, email, password, isAdmin, dailyCalorieLimit, monthlyBudget }, authUser) {
    const check = await User.find({
      where: {
        email: email.toLowerCase()
      }
    })
    if(check.length === 0) {
      const user = new User();
      user.name = name;
      user.email = email;
      user.password = Bcryptjs.hashSync(password, 10);
      user.isAdmin = isAdmin;
      user.dailyCalorieLimit = dailyCalorieLimit;
      user.monthlyBudget = monthlyBudget;
      await user.save();
      return user;
    } else throw new HttpException("User email already exists", 400);
  }

  async update(id, { name, email, password, isAdmin, dailyCalorieLimit, monthlyBudget }, authUser) {
    if(authUser.isAdmin || authUser.id === id) {
      const userById = await User.findOne(id)
      if (authUser.id === id && authUser.isAdmin && isAdmin === false) {
        throw new HttpException('Cannot change role for self', 400)
      } else {
        if (userById) {
          const userByEmail = await User.findOne({
            where: {
              email: email.toLowerCase()
            }
          })
          if (!userByEmail || (userByEmail.id) == (id)) {
            userById.name = name;
            userById.email = email;
            if (password) {
              userById.password = Bcryptjs.hashSync(password, 10);
            }
            userById.isAdmin = isAdmin;
            userById.dailyCalorieLimit = dailyCalorieLimit;
            userById.monthlyBudget = monthlyBudget;
            await userById.save();
            return userById;
          } else throw new HttpException('Email already exists', 400);
        } else throw new NotFoundException();
      }
    } else throw new HttpException('Unauthorised',400)
  }

  async delete(id, authUser) {
    const user = await User.findOne(id);
    if (user.id !== authUser.id) {
      if (user) {
        await User.delete(id);
        return {};
      } else throw new NotFoundException();
    } else throw new HttpException("User cannot delete oneself", 400)
  }

}