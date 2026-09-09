import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { reviewController } from "./review.controller";

const router = Router();

router.post("/", auth("CUSTOMER"), reviewController.createReview);
router.get("/", reviewController.getAllReviews);

export const reviewRoutes = router;
