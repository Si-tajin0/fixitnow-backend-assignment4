import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { serviceController } from "./service.controller";

const router = Router();

router.post("/", auth("TECHNICIAN"), serviceController.createService);
router.get("/", serviceController.getAllServices);

export const serviceRoutes = router;
