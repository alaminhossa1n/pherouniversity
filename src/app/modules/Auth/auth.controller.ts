import { NextFunction, Request, Response } from "express";
import { AuthServices } from "./auth.service";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthServices.loginUser(req.body);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "User login successful",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = req.user;

    const result = await AuthServices.changePassword(currentUser, req.body);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Password changed successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const AuthControllers = {
  loginUser,
  changePassword,
};
