import { Request, Response } from "express";
import { catchAsync } from "../../utitls/catchAsync";
import { technicianService } from "./technician.service";
import { sendResponse } from "../../utitls/sendResponse";
import httpStatus from "http-status";

// Get All Technician
const getAllTechnicians = catchAsync(async (req: Request, res: Response) => {
  const result = await technicianService.getAllTechniciansFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Technicians retrieved successfully",
    data: result,
  });
});

// Get Technician ID
const getTechnicianById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  if (!id) {
    throw new Error("Technician ID is required!");
  }

  const result = await technicianService.getTechnicianByIdFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Technician profile retrieved successfully",
    data: result,
  });
});

export const technicianController = {
  getAllTechnicians,
  getTechnicianById,
};
