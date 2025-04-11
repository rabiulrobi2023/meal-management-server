import httpStatus from "http-status";
import { TErrorResponse, TErrorSources } from "./error.interface";

const handleDuplicateError = (err: any): TErrorResponse => {
  const match = err.message.match(/\d+(\.\d+)?/g);
  const extractedMessage = match | match[2];
  const errorKey = Object.keys(err.keyValue);

  const errorSources = [
    {
      path: "",
      message: `The ${errorKey}: ${extractedMessage} is already exists`,
    },
  ];

  const statusCode = httpStatus.CONFLICT;
  return {
    statusCode,
    message: "Duplicate entry detected",
    errorSources,
  };
};

export default handleDuplicateError;
