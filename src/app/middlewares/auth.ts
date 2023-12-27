import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(501, "You are not authorized");
    }

    //verify the token
    jwt.verify(token, config.jwt_secret as string, function (err, decoded) {
      if (err) {
        throw new AppError(501, "You are not authorized");
      }
      const role = (decoded as JwtPayload).role;

      if (roles && !roles.includes(role)) {
        throw new AppError(501, "You are not authorized!");
      }

      req.user = decoded as JwtPayload;
    });

    next();
  };
};

export default auth;
