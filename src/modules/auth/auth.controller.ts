import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utitls/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utitls/sendResponse";
import httpStatus from "http-status";
import config from "../../config";
import { jwtUtils } from "../../utitls/jwt";

// Register User
const registerCustomer = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = await authService.registerCustomerIntoDB(payload);

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
const loginCustomer = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const loginResult = await authService.loginCustomer(payload);

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

//  Get Customer Profile
const getCustomerProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;
    console.log(accessToken);

    const verifiedToken = jwtUtils.verifyToken(
      accessToken,
      config.jwt_access_secret,
    );

    if (typeof verifiedToken === "string") {
      throw new Error(verifiedToken);
    }

    const profile = await authService.getCustomerProfileFromDB(
      verifiedToken.id,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile retrieved successfully",
      data: { profile },
    });
  },
);

export const authController = {
  registerCustomer,
  loginCustomer,
  getCustomerProfile,
};
