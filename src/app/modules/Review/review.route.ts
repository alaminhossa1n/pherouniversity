import express from "express";
import { reviewControllers } from "./review.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/", auth, reviewControllers.createReview);

export const reviewRoutes = router;
