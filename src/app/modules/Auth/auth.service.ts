import config from "../../config";
import AppError from "../../errors/AppError";
import UserModel from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUser = async (payload: TLoginUser) => {
  const isUserExist = await UserModel.findOne({ username: payload?.username });

  if (!isUserExist) {
    throw new AppError(404, "User does not exit");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExist?.password
  );

  const jwtPayload = {
    _id: isUserExist?._id,
    role: isUserExist?.role,
    email: isUserExist?.email,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: 60 * 60,
  });

  return {
    user: {
      _id: isUserExist?._id,
      role: isUserExist?.role,
      email: isUserExist?.email,
      username: isUserExist?.username,
    },
    token: accessToken,
  };
};

export const AuthServices = {
  loginUser,
};
