import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { paymentController } from "./payment.controller";

const router = Router();

router.post("/create", auth("CUSTOMER"), paymentController.createPayment);

router.post("/confirm", auth("CUSTOMER"), paymentController.confirmPayment);

export const paymentRoutes = router;
