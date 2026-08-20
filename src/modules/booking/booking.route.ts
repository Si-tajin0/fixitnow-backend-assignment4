import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/bookings", auth("CUSTOMER"), bookingController.createBooking);

router.get(
  "/bookings",
  auth("CUSTOMER", "TECHNICIAN"),
  bookingController.getMyBookings,
);

export const bookingRoutes = router;
