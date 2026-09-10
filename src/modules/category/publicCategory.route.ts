import { Router } from "express";
import { categoryController } from "./category.controller";

const router = Router();

router.get("/", categoryController.getPublicAllCategories);

export const publicCategoryRoutes = router;
