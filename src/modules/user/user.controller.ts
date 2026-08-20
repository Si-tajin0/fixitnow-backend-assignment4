import { Request, Response } from "express";
import { catchAsync } from "../../utitls/catchAsync";
import { userService } from "./user.service";
import { sendResponse } from "../../utitls/sendResponse";
import httpstatus from "http-status";

// Get All Users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllusersFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpstatus.OK,
    message: "Users retrieved successfully",
    data: result,
  });
});

// User Status Change
const changeUserStatus = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id as string;
  const { status } = req.body;

  const result = await userService.changeUserStatusInDB(userId, status);

  sendResponse(res, {
    success: true,
    statusCode: httpstatus.OK,
    message: `User Status changed to ${status} successfully`,
    data: result,
  });
});
export const userController = {
  getAllUsers,
  changeUserStatus,
};
