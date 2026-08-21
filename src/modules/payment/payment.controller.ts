import { Request, Response } from "express";
import { catchAsync } from "../../utitls/catchAsync";
import { paymentService } from "./payment.service";
import { sendResponse } from "../../utitls/sendResponse";
import httpStatus from "http-status";

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

export const paymentController = {
  createPayment,
};
