import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { technicianController } from "./technician.controller";

const router = Router();

// Profile Update
router.put(
  "/profile",
  auth("TECHNICIAN"),
  technicianController.updateTechnicianProfile,
);

// Availability Update
router.put(
  "/availability",
  auth("TECHNICIAN"),
  technicianController.updateAvailability,
);

export const technicianProfileRoutes = router;
