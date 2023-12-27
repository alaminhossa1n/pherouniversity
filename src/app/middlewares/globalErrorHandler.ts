import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import handleMongooseValidationError from "../errors/handleMongooseErroe";
import handleCastError from "../errors/handleCastError";
import AppError from "../errors/AppError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorMessage = "";

  let errorDetails;

  if (err instanceof ZodError) {
    const modifiedError = handleZodError(err);

    message = modifiedError.message;
    errorMessage = modifiedError.errorMessage;
    errorDetails = modifiedError.errorDetails;
  } else if (err?.name === "ValidationError") {
    const modifiedError = handleMongooseValidationError(err);

    message = modifiedError.message;
    errorMessage = modifiedError.errorMessage;
    errorDetails = modifiedError.errorDetails;
  } else if (err?.name === "CastError") {
    const modifiedError = handleCastError(err);

    message = modifiedError.message;
    // errorMessage = modifiedError.errorMessage;
    // errorDetails = modifiedError.errorDetails;
    // TODO 
  }else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    stack: err?.stack,
  });
};

export default globalErrorHandler;
