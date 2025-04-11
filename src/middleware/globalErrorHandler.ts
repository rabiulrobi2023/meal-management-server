import { ErrorRequestHandler } from "express";
import AppError from "../error/AppError";
import { TErrorSources } from "../error/error.interface";
import handleDuplicateError from "../error/handleDuplicateError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong";

  let source: TErrorSources = [
    {
      path: "",
      message: message,
    },
  ];
  if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    source = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }
  if (err.code === 11000) {
    const simplifyError = handleDuplicateError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    source = simplifyError.errorSources;
  }

  res.status(statusCode).json({
    success: false,
    message,
    source,
  });
};

export default globalErrorHandler;
