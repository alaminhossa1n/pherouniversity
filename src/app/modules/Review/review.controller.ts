import { NextFunction, Request, Response } from "express";
import { reviewServices } from "./review.service";

const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await reviewServices.createReviewInToDB(req.body);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Review created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const reviewControllers = {
  createReview,
};
