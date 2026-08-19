import { Router, Request, Response, NextFunction } from "express";
import { authController } from "./auth.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";

const router = Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.get(
  "/me",
  auth("ADMIN", "CUSTOMER", "TECHNICIAN"),
  authController.getMyProfile,
);

export const authRoutes = router;
