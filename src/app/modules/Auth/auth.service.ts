import config from "../../config";
import AppError from "../../errors/AppError";
import UserModel from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

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
    expiresIn: "10d",
  });

  console.log(accessToken);

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

//change password
const changePassword = async (
  currentUser: JwtPayload,
  payload: { currentPassword: string; newPassword: string }
) => {
  const isUserExist = await UserModel.findOne({ _id: currentUser?._id });

  if (!isUserExist) {
    throw new AppError(404, "User does not exit");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.currentPassword,
    isUserExist?.password
  );

  if (!isPasswordMatched) {
    throw new AppError(404, "Password does not matched");
  }
  
};

export const AuthServices = {
  loginUser,
  changePassword,
};
