import { Request, Response } from "express";
import { catchAsync } from "../../utitls/catchAsync";
import { paymentService } from "./payment.service";
import { sendResponse } from "../../utitls/sendResponse";
import httpStatus from "http-status";

// Create Payment
const createPayment = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user.id;
  const { bookingId } = req.body;

  const result = await paymentService.createPaymentSessionIntoDB(
    bookingId,
    customerId,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Payment session created successfully",
    data: result,
  });
});

// Confirm Payment
const confirmPayment = catchAsync(async (req: Request, res: Response) => {
  const { transactionId } = req.body;

  const result = await paymentService.confirmPaymentIntoDB(transactionId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment confirmed successfully",
    data: result,
  });
});

// Get All Payment
const getMyPaymentHistory = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user.id;

  const result = await paymentService.getMyPaymentHistoryFromDB(customerId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment history retrieved successfully",
    data: result,
  });
});

// Get Payment by ID
const getPaymentById = catchAsync(async (req: Request, res: Response) => {
  const paymentId = req.params.id as string;
  const customerId = req.user.id;

  const result = await paymentService.getPaymentByIdFromDB(
    paymentId,
    customerId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment details retrieved successfully",
    data: result,
  });
});

export const paymentController = {
  createPayment,
  confirmPayment,
  getMyPaymentHistory,
  getPaymentById,
};
