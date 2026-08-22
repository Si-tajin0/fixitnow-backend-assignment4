import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import config from "../config";
import { ZodError } from "zod";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || "Something went wrong!";
  let errorDetails = err;

  // Zod validation
  if (err instanceof ZodError) {
    statusCode = httpStatus.BAD_REQUEST;

    const errorMessages = err.issues.map((issue: any) => {
      return `${issue.path[issue.path.length - 1]} is invalid: ${issue.message}`;
    });

    message = errorMessages.join(". ");
    errorDetails = err.issues;
  }
  res.status(statusCode).json({
    success: false,
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    message: message,
    error: errorDetails,
    stack: config.env === "development" ? err?.stack : null,
  });
};
