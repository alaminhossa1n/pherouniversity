import { ZodError, ZodIssue } from "zod";

export const handleZodError = (err: ZodError) => {
  const errorMessage = err.issues
    .map((issue) => {
      return issue.message;
    })
    .join(", ");

  return {
    message: "Validation Error",
    errorMessage,
    errorDetails: err.issues,
  };
};

export default handleZodError;
