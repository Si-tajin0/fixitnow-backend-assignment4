import { Router } from "express";
import { technicianController } from "./technician.controller";

const router = Router();

router.get("/technicians", technicianController.getAllTechnicians);
router.get("/technicians/:id", technicianController.getTechnicianById);

export const technicianRoutes = router;
