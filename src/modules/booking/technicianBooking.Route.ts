import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { bookingController } from "./booking.controller";

const router = Router();

router.patch("/:id", auth("TECHNICIAN"), bookingController.updateBookingStatus);

export const technicianBookingRoutes = router;
