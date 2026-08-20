import { Request, Response } from "express";
import { catchAsync } from "../../utitls/catchAsync";
import { serviceService } from "./service.service";
import { sendResponse } from "../../utitls/sendResponse";
import httpStatus from "http-status";

// Create Service
const createService = catchAsync(async (req: Request, res: Response) => {
  const technicianId = req.user.id;

  const result = await serviceService.createServiceIntoDB(
    technicianId,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Service created successfully",
    data: result,
  });
});

// Get All Service
const getAllServices = async (req: Request, res: Response) => {
  const result = await serviceService.getAllServiceintoDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Service retrieved successfully",
    data: result,
  });
};

export const serviceController = {
  createService,
  getAllServices,
};
