import mongoose, { Types } from "mongoose";
import { TCourse, TQueryParams } from "./course.interface";
import CourseModel from "./course.model";

const createCourseInToDB = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

//update course
const updateCourseById = async (
  courseId: string,
  payload: Partial<TCourse>
) => {
  const { details, tags, ...remainingData } = payload;
  const modifiedData: Record<string, unknown> = {
    ...remainingData,
  };

  if (tags && tags.length > 0) {
    const deletedTags = tags
      ?.filter((el) => el.name && el.isDeleted)
      .map((el) => el.name);

    const deletedTagsResult = await CourseModel.findByIdAndUpdate(
      courseId,
      {
        $pull: {
          tags: { name: { $in: deletedTags } },
        },
      },
      {
        new: true,
      }
    );

    const newTags = tags?.filter((el) => el.name && !el.isDeleted);

    const updatedTagsResult = await CourseModel.findByIdAndUpdate(
      courseId,
      {
        $addToSet: { tags: { $each: newTags } },
      },
      {
        new: true,
      }
    );
  }

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedData[`details.${key}`] = value;
    }
  }

  const result = await CourseModel.findByIdAndUpdate(
    courseId,
    { $set: modifiedData },
    { new: true }
  ).populate('createdBy');
  return result;
};

//7. Get Course by ID with Reviews**

const getCourseByIdWithReviewsFromDB = async (id: string) => {
  const objectId = new Types.ObjectId(id);

  const result = await CourseModel.aggregate([
    {
      $match: { _id: objectId },
    },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdBy",
      },
    },
    {
      $addFields: {
        createdBy: { $arrayElemAt: ["$createdBy", 0] },
      },
    },
    {
      $project: {
        "createdBy.password": 0,
        "createdBy.lastThreePassword": 0,
      },
    },
    {
      $lookup: {
        from: "reviews",
        let: { courseId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$courseId", "$$courseId"],
              },
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "createdBy",
              foreignField: "_id",
              as: "createdBy",
            },
          },
          {
            $addFields: {
              createdBy: { $arrayElemAt: ["$createdBy", 0] },
            },
          },
          {
            $project: {
              _id: 1,
              courseId: 1,
              rating: 1,
              review: 1,
              createdBy: { _id: 1, username: 1, email: 1, role: 1 },
            },
          },
        ],
        as: "reviews",
      },
    },
  ]);

  return result[0]; // Assuming there is only one course with the given ID
};

//Get the Best Course Based on Average Review (Rating)
const getBestCourseBasedOnReviewFromDB = async () => {
  const result = await CourseModel.aggregate([
    {
      $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "courseId",
        as: "reviews",
      },
    },
    {
      $unwind: "$reviews",
    },
    {
      $group: {
        _id: "$_id",
        course: { $first: "$$ROOT" },
        averageRating: { $avg: "$reviews.rating" },
        totalReviews: { $sum: 1 },
      },
    },

    {
      $sort: { averageRating: -1 },
    },
    {
      $limit: 1,
    },
    {
      $lookup: {
        from: "users",
        localField: "course.createdBy",
        foreignField: "_id",
        as: "course.createdBy",
      },
    },
    {
      $addFields: {
        "course.createdBy": { $arrayElemAt: ["$course.createdBy", 0] },
      },
    },
    {
      $project: {
        "course.reviews": 0,
        "course.createdBy.password": 0, 
        "course.createdBy.lastThreePassword": 0,
        _id: 0,
      },
    },
  ]);
  return result[0];
};

// get course with filtered
const getAllCoursesFromDB = async (queryParams: TQueryParams) => {
  const {
    page = 1,
    limit = 10,
    sortBy,
    sortOrder = "asc",
    minPrice,
    maxPrice,
    tags,
    startDate,
    endDate,
    language,
    provider,
    durationInWeeks,
    level,
  } = queryParams;

  const skip = (page - 1) * limit;

  const filter: any = {};

  if (tags) {
    filter.tags.name = { $in: [tags] };
    console.log(tags);
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = minPrice;
    if (maxPrice) filter.price.$lte = maxPrice;
  }

  if (startDate || endDate) {
    filter.startDate = {};
    if (startDate) filter.startDate.$gte = new Date(startDate);
    if (endDate) filter.startDate.$lte = new Date(endDate);
  }

  if (language) {
    filter.language = language;
  }

  if (provider) {
    filter.provider = provider;
  }

  if (durationInWeeks) {
    filter.durationInWeeks = durationInWeeks;
  }

  if (level) {
    filter["details.level"] = level;
  }

  const sort: any = {};
  if (sortBy) {
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;
  }

  const courses = await CourseModel.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);
  return courses;
};

export const courseServices = {
  createCourseInToDB,
  updateCourseById,
  getCourseByIdWithReviewsFromDB,
  getBestCourseBasedOnReviewFromDB,
  getAllCoursesFromDB,
};
