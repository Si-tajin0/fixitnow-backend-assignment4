import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import config from "../config";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || "Something went wrong!";

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    message: err.message,
    error: err,
    stack: config.env === "development" ? err?.stack : null,
  });
};
