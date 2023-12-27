import config from "../../config";
import AppError from "../../errors/AppError";
import UserModel from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { comparePassword, makeHashed } from "./auth.const";

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
  const isUserExist = await UserModel.findOne({ _id: currentUser?._id }).select('+password');

  if (!isUserExist) {
    throw new AppError(404, "User does not exit");
  }

  const isPasswordMatched = await comparePassword(
    payload?.currentPassword,
    isUserExist?.password
  );

  if (!isPasswordMatched) {
    throw new AppError(404, "Password does not matched");
  }

  const lastThreePassword: string[] = isUserExist?.lastThreePassword || [];

  if (lastThreePassword?.includes(payload.newPassword)) {
    throw new AppError(
      400,
      `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${isUserExist?.passwordChangedAt}).`
    );
  }

  const hashedPassword = await makeHashed(payload.newPassword);

  lastThreePassword.unshift(payload.newPassword);

  if (lastThreePassword.length > 3) {
    lastThreePassword.pop();
  }

  const result = await UserModel.findOneAndUpdate(
    {
      username: isUserExist?.username,
      role: isUserExist?.role,
    },
    {
      password: hashedPassword,
      lastThreePassword: lastThreePassword,
      passwordChangedAt: new Date(),
    },
    {
      new: true,
    }
  );

  return result;
};

export const AuthServices = {
  loginUser,
  changePassword,
};
