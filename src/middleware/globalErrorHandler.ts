/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";
import AppError from "../error/AppError";
import { TErrorSources } from "../error/error.interface";
import handleDuplicateError from "../error/handleDuplicateError";
import mongoose from "mongoose";
import handleValidationError from "../error/handleValidationError";
import { ZodError } from "zod";
import handleZodValidationError from "../error/handleZodValidationError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong";

  let source: TErrorSources = [
    {
      path: "",
      message: message,
    },
  ];

  if (err instanceof ZodError) {
    const simplifyError = handleZodValidationError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    source = simplifyError.errorSources;
  } else if (err.name === "ValidationError") {
    const simplifyError = handleValidationError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    source = simplifyError.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    source = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    source = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err.code === 11000) {
    const simplifyError = handleDuplicateError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    source = simplifyError.errorSources;
  } else if (err.code === "CastError") {
    statusCode = err?.code;
  }

  res.status(statusCode).json({
    success: false,
    message,
    source,
  });
};

export default globalErrorHandler;
