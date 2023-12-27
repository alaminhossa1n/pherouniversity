import { TReview } from "./review.interface";
import ReviewModel from "./review.model";

const createReviewInToDB = async (payload: TReview) => {
  const result = (await ReviewModel.create(payload));
  return result;
};

export const reviewServices = {
  createReviewInToDB,
};
