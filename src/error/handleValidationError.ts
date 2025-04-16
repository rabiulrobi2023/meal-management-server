import httpStatus from "http-status";
import mongoose from "mongoose";
import { TErrorResponse, TErrorSources } from "./error.interface";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TErrorResponse => {
  const errorSources: TErrorSources = Object.values(err.errors).map((val) => {
    return {
      path: val.path,
      message: val.message,
    };
  });
  const statusCode = httpStatus.BAD_GATEWAY;

  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};
export default handleValidationError;
