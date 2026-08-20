import { Request, Response } from "express";
import { catchAsync } from "../../utitls/catchAsync";
import { bookingService } from "./booking.service";
import { sendResponse } from "../../utitls/sendResponse";
import httpStatus from "http-status";
import { BookingStatus } from "../../../generated/prisma/client";

// Create Bookings
const createBooking = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user.id as string;

  const result = await bookingService.createNewBookingIntoDB(
    customerId,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Booking created successfully",
    data: result,
  });
});

// Get My Booking
const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const { id: userId, role } = req.user;
  const result = await bookingService.getMyBookingsFromDB(userId, role);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking retrieved successfully",
    data: result,
  });
});

// Technician Update Booking Status
const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
  const bookingId = req.params.id;
  const status = req.body.status as BookingStatus;
  const technicianId = req.user.id as string;

  const result = await bookingService.updateBookingStatusIntoDB(
    bookingId as string,
    technicianId,
    status,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking status update successfully",
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getMyBookings,
  updateBookingStatus,
};
