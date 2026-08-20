import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { notFound } from "./middlewares/notFound";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { authRoutes } from "./modules/auth/auth.routes";
import { categoryRoutes } from "./modules/category/category.route";
import { serviceRoutes } from "./modules/service/service.route";
import { technicianRoutes } from "./modules/technician/technician.route";
import { bookingRoutes } from "./modules/booking/booking.route";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

//Authentication Route
app.use("/api/auth/", authRoutes);

//Admin Category Route
app.use("/api/admin/", categoryRoutes);

// Service Route
app.use("/api/", serviceRoutes);

// Technician Route
app.use("/api/", technicianRoutes);

// Booking Route
app.use("/api/", bookingRoutes);

//  Not Found Route
app.use(notFound);

// Global Error Handler Route
app.use(globalErrorHandler);

export default app;
