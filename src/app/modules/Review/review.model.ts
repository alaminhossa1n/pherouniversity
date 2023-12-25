import { Schema, model } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  rating: {
    type: Number,
  },
  review: {
    type: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const ReviewModel = model<TReview>("review", reviewSchema);

export default ReviewModel;
