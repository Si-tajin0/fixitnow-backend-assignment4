import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { categoryController } from "./category.controller";

const router = Router();

router.post("/categories", auth("ADMIN"), categoryController.createCategory);

router.get("/categories", auth("ADMIN"), categoryController.getAllCategories);

export const categoryRoutes = router;
