import { NextFunction, Request, Response } from "express";
import { courseServices } from "./course.service";

const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body.createdBy = req.user._id;

    const result = await courseServices.createCourseInToDB(req.body);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Course created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId } = req.params;
    const result = await courseServices.updateCourseById(courseId, req.body);
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Course updated successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

//7. Get Course by ID with Reviews**
const getCourseByIdWithReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId } = req.params;
    const result = await courseServices.getCourseByIdWithReviewsFromDB(
      courseId
    );
    res.status(201).json({
      success: true,
      statusCode: 200,
      message: "Course and Reviews retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getBestCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await courseServices.getBestCourseBasedOnReviewFromDB();
    res.status(201).json({
      success: true,
      statusCode: 200,
      message: "Best course retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

//get courses with filtered
const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await courseServices.getAllCoursesFromDB(req.query);
    res.status(201).json({
      success: true,
      statusCode: 200,
      message: "Courses retrieved successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const courseControllers = {
  createCourse,
  updateCourse,
  getCourseByIdWithReviews,
  getBestCourses,
  getAllCourses,
};
