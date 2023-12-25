import mongoose from "mongoose";

const handleCastError = (err: mongoose.Error.CastError) => {
  const statusCode = 400;

  return {
    message: "Invalid ID",
    // errorMessage,
    // errorDetails: err.issues, >>TODO
  };
};

export default handleCastError;
