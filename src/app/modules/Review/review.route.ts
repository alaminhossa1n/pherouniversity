import express from "express";
import { reviewControllers } from "./review.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/", auth('user'), reviewControllers.createReview);

export const reviewRoutes = router;
