import { Request, Response } from "express";
import { catchAsync } from "../../utitls/catchAsync";
import { categoryService } from "./category.service";
import { sendResponse } from "../../utitls/sendResponse";
import httpStatus from "http-status";
import { setGlobalProxyFromEnv } from "node:http";

// Create Category
const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.createCategoryIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Category created successfully",
    data: result,
  });
});

// Get All Categories
const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategoryIntoDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Categories retrived successfully",
    data: result,
  });
});

export const categoryController = {
  createCategory,
  getAllCategories,
};
