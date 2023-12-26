import z from "zod";

const loginValidationSchema = z.object({
  username: z.string({ required_error: "Username is required" }),
  password: z.string({ required_error: "Password is required" }),
});

export const AuthValidation = {
  loginValidationSchema,
};
