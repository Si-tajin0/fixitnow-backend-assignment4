import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { paymentController } from "./payment.controller";

const router = Router();

router.post("/create", auth("CUSTOMER"), paymentController.createPayment);

router.post("/confirm", auth("CUSTOMER"), paymentController.confirmPayment);

router.get("/", auth("CUSTOMER"), paymentController.getMyPaymentHistory);

router.get("/:id", auth("CUSTOMER"), paymentController.getPaymentById);

export const paymentRoutes = router;
