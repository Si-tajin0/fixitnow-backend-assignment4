import { Router } from "express";
import { authController } from "./auth.controller";
import { auth } from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { authValidation } from "./auth.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(authValidation.registerValidationSchema),
  authController.registerUser,
);

router.post(
  "/login",
  validateRequest(authValidation.loginvalidationSchema),
  authController.loginUser,
);

router.get(
  "/me",
  auth("ADMIN", "CUSTOMER", "TECHNICIAN"),
  authController.getMyProfile,
);

export const authRoutes = router;
