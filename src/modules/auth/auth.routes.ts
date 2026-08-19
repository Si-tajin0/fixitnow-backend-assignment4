import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/register", authController.registerCustomer);

router.post("/login", authController.loginCustomer);

router.get("/me", authController.getCustomerProfile);

export const authRoutes = router;
