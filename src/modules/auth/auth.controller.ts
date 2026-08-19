import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utitls/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utitls/sendResponse";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utitls/jwt";

// Register User
const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = await authService.registerUserIntoDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User registered successfully",
      data: {
        user,
      },
    });
  },
);

// Login User
const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const loginResult = await authService.loginUser(payload);

    const { accessToken, refreshToken, user } = loginResult;

    // Access Token cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24, // 24 hour or 1 day
    });

    // Refresh Token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7day
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in Successfully! ",
      data: { accessToken, refreshToken, user },
    });
  },
);

//  Get My Profile
const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;
    console.log(accessToken);

    const verifiedToken = jwtUtils.verifyToken(
      accessToken,
      config.jwt_access_secret,
    );

    console.log(verifiedToken);

    res.send("Get My Profile");
  },
);

export const authController = {
  registerUser,
  loginUser,
  getMyProfile,
};
