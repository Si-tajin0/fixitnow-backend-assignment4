import { JwtPayload } from "jsonwebtoken";
import { Role } from "../../generated/prisma/enums";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utitls/catchAsync";
import { jwtUtils } from "../utitls/jwt";
import { prisma } from "../lib/prisma";
import config from "../config";
import httpStatus from "http-status";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

export const auth = (...requiredRoles: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // ১. টোকেন রিসিভ করা
    const token = req.cookies.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization?.startsWith("Bearer")
        ? req.headers.authorization?.split(" ")[1]
        : req.headers.authorization;

    if (!token) {
      throw new Error(
        "You are not logged in. Please log in to access this resource",
      );
    }

    const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

    if (!verifiedToken.success) {
      throw new Error(verifiedToken.error);
    }

    const { email, name, id, role } = verifiedToken.data as JwtPayload;

    // ৩. রোল চেক করা
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new Error(
        "Forbidden. You don't have permission to access this resource",
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "User not found! Please log in again.",
      });
    }

    if (user.status === "BLOCKED") {
      return res.status(httpStatus.FORBIDDEN).json({
        success: false,
        message: "Forbidden! Your account is blocked by the admin.",
      });
    }

    req.user = {
      email,
      id,
      name,
      role,
    };

    next();
  });
};
