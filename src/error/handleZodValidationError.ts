import httpStatus from "http-status";
import { ZodError, ZodIssue } from "zod";
import { TErrorResponse, TErrorSources } from "./error.interface";

const handleZodValidationError = (err: ZodError): TErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = httpStatus.BAD_REQUEST;

  return {
    statusCode,
    message: "Zod validation error",
    errorSources,
  };
};

export default handleZodValidationError;
