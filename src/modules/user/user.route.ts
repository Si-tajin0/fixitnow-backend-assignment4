import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { userController } from "./user.controller";

const router = Router();

router.get("/", auth("ADMIN"), userController.getAllUsers);

router.patch("/:id", auth("ADMIN"), userController.changeUserStatus);

export const userRoutes = router;
