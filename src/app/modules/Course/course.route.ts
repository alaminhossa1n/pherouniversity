import express from "express";
import { courseControllers } from "./course.controller";
import validateRequest from "../../middlewares/validateRequest";
import { courseValidations } from "./course.validation";

const router = express.Router();

router.post(
  "/course",
  validateRequest(courseValidations.createCourseValidationSchema),
  courseControllers.createCourse
);

router.put(
  "/courses/:courseId",
  validateRequest(courseValidations.updateCourseValidationSchema),
  courseControllers.updateCourse
);

router.get(
  "/courses/:courseId/reviews",
  courseControllers.getCourseByIdWithReviews
);

router.get("/course/best", courseControllers.getBestCourses);

router.get("/courses", courseControllers.getAllCourses);

export const courseRoutes = router;
