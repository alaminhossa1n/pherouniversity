import z from "zod";
const createCategoryValidationSchema = z.object({
  name: z.string({
    required_error: "Name is Required",
  }),
});

export const categoryValidations = {
  createCategoryValidationSchema,
};
