import { HttpException } from "@nestjs/common";
import * as Jwt from "jsonwebtoken";
import { ObjectSchema } from "joi";
import User from "./entity/user";

export const PageSize = 10;

export const JoiValidate = (schema: ObjectSchema, data: Record<string, string | number>) => {
  const { value, error } = schema.validate(data);
  if (error) throw new HttpException(error.message, 400);
  return value;
};

export const JwtSecret = "r38746sgdkjs834798bshkdshadg";

export const verifyJwtToken = async (token: string) => {
  try {
    const decoded = Jwt.verify(token, JwtSecret);
    const { id } = decoded;
    const user = await User.findOne(id);
    return user;
  } catch (e) {
    return null;
  }
};
