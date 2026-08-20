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

// Profile update
const updateTechnicianProfile = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user.id;

    const result = await technicianService.updateTechnicianProfileIntoDB(
      userId,
      req.body,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Technician profile updated successfully",
      data: result,
    });
  },
);

// Availability Update
const updateAvailability = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { isAvailable } = req.body;

  const result = await technicianService.updateAvailabilityIntoDB(
    userId,
    isAvailable,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Availability updated successfully",
    data: result,
  });
});

export const technicianController = {
  getAllTechnicians,
  getTechnicianById,
  updateTechnicianProfile,
  updateAvailability,
};
