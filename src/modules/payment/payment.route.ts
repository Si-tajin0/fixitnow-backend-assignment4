import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { paymentController } from "./payment.controller";

const router = Router();

router.post("/create", auth("CUSTOMER"), paymentController.createPayment);

export const paymentRoutes = router;
