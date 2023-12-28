import { NextFunction, Request, Response } from "express";
import { categoryServices } from "./category.service";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.createdBy = req.user._id;

    const result = await categoryServices.createCategoryInToDB(req.body);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Category created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// get all categories
const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await categoryServices.getAllCategoriesFromDB();
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Categories retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
export const categoryControllers = {
  createCategory,
  getAllCategories,
};
