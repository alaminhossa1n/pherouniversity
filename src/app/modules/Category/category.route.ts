import express from "express";
import { categoryControllers } from "./category.controller";
import validateRequest from "../../middlewares/validateRequest";
import { categoryValidations } from "./category.validation";
const router = express.Router();

router.post(
  "/",
  validateRequest(categoryValidations.createCategoryValidationSchema),
  categoryControllers.createCategory
);
router.get("/", categoryControllers.getAllCategories);

export const categoryRoutes = router;
