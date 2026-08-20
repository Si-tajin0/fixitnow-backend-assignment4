import { Request, Response } from "express";
import { catchAsync } from "../../utitls/catchAsync";
import { bookingService } from "./booking.service";
import { sendResponse } from "../../utitls/sendResponse";
import httpStatus from "http-status";

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

export const bookingController = {
  createBooking,
};
