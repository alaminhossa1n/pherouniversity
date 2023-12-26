import AppError from "../../errors/AppError";
import UserModel from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";

const loginUser = async (payload: TLoginUser) => {
  const isUserExist = await UserModel.findOne({ username: payload?.username });

  if (!isUserExist) {
    throw new AppError(404, "User does not exit");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    isUserExist?.password
  );

  console.log(isPasswordMatched);
};

export const AuthServices = {
  loginUser,
};
