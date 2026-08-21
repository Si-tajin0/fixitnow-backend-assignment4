import { Request, Response } from "express";
import { catchAsync } from "../../utitls/catchAsync";
import httpStatus from "http-status";
import { reviewService } from "./review.service";
import { sendResponse } from "../../utitls/sendResponse";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const customerId = req.user.id;

  const result = await reviewService.createReviewIntoDB(customerId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Review submitted successfully",
    data: result,
  });
});

export const reviewController = {
  createReview,
};
