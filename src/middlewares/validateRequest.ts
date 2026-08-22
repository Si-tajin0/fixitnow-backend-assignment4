import { ZodSchema } from "zod";
import { catchAsync } from "../utitls/catchAsync";
import { NextFunction, Request, Response } from "express";

export const validateRequest = (schema: ZodSchema) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
    });
    next();
  });
};
