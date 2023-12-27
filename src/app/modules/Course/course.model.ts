import { Schema, Types, model } from "mongoose";
import { TCourse } from "./course.interface";
import weeksCount from "../../builder/weeksCount";

const courseSchema = new Schema<TCourse>(
  {
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "category",
    },
    price: { type: Number, required: true },
    tags: [
      {
        name: { type: String, required: true },
        isDeleted: { type: Boolean, required: true },
      },
    ],
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },
    durationInWeeks: { type: Number },
    details: {
      level: { type: String },
      description: { type: String },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true } // adds createdAt and updatedAt fields
);

courseSchema.pre("save", function (next) {
  const adjustedWeeks = weeksCount(this.startDate, this.endDate);
  this.durationInWeeks = adjustedWeeks;
  next();
});

const CourseModel = model<TCourse>("Course", courseSchema);

export default CourseModel;
