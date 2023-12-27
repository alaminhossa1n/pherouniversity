import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(501, "You are not authorized");
    }
  } catch (err) {
    next(err);
  }

  next();
};

export default auth;
