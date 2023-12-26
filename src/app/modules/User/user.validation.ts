import z from "zod";

const createUserValidationSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(["user", "admin"]),
});

export const userValidation = {
  createUserValidationSchema,
};
