import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/", auth("CUSTOMER"), bookingController.createBooking);

router.get(
  "/",
  auth("CUSTOMER", "TECHNICIAN", "ADMIN"),
  bookingController.getMyBookings,
);

// Specific Booking Id Details
router.get(
  "/:id",
  auth("CUSTOMER", "TECHNICIAN"),
  bookingController.getBookingById,
);

// Cancel Booking (Only Customer)

router.patch("/:id/cancel", auth("CUSTOMER"), bookingController.cancelBooking);
export const bookingRoutes = router;
