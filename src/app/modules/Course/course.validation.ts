import z from "zod";

const TagSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean(),
});

const createCourseValidationSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  instructor: z.string({ required_error: "Instructor is required" }),
  categoryId: z.string({ required_error: "Category ID is required" }),
  price: z.number({ required_error: "Price is required" }),
  tags: z.array(TagSchema),
  startDate: z.string({ required_error: "Start date is required" }),
  endDate: z.string({ required_error: "End date is required" }),
  language: z.string({ required_error: "Language is required" }),
  provider: z.string({ required_error: "Provider is required" }),
  details: z.object({
    level: z.string({ required_error: "Level is required" }),
    description: z.string(),
  }),
});

const updateCourseValidationSchema = z.object({
  title: z.string().optional(),
  instructor: z.string().optional(),
  categoryId: z.string().optional(),
  price: z.number().optional(),
  tags: z.array(TagSchema).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  language: z.string().optional(),
  provider: z.string().optional(),
  details: z
    .object({
      level: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
});

export const courseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
