import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";

const categorySchema = new Schema<TCategory>({
  name: {
    type: String,
  },
});

const CategoryModel = model<TCategory>("category", categorySchema);
export default CategoryModel;
