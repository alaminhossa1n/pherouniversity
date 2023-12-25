import express from "express";
import { reviewControllers } from "./review.controller";

const router = express.Router();

router.post("/", reviewControllers.createReview);

export const reviewRoutes = router;
