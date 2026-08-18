import httpstatus from "http-status";
import { Request, Response } from "express";
import { userService } from "./auth.service";

const registerUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const user = await userService.registerUserIntoDB(payload);

    res.status(httpstatus.CREATED).json({
      success: true,
      statusCode: httpstatus.CREATED,
      message: "User register Succussefully",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(httpstatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: httpstatus.INTERNAL_SERVER_ERROR,
      message: "Failed to register user",
      error: (error as Error).message,
    });
  }
};

export const userController = {
  registerUser,
};
