import mongoose from "mongoose";

const handleMongooseValidationError = (err: mongoose.Error.ValidationError) => {
  const errorMessage = Object.values(err.errors)
    .map((val) => {
      return val.message;
    })
    .join(", ");
    
  return {
    message: "Validation Error",
    errorMessage,
    errorDetails: err.errors,
  };
};

export default handleMongooseValidationError;
