import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { TBookingPayload } from "./booking.interface";

// create Booking
const createNewBookingIntoDB = async (
  customerId: string,
  payload: TBookingPayload,
) => {
  const result = await prisma.booking.create({
    data: {
      customerId,
      serviceId: payload.serviceId,
      technicianId: payload.technicianId,
      serviceDate: new Date(payload.serviceDate),
      scheduledTime: payload.scheduledTime,
      status: "REQUESTED",
    },
    include: {
      service: true,
      technician: {
        select: { name: true, phone: true },
      },
    },
  });
  return result;
};

// Get My Booking
const getMyBookingsFromDB = async (userId: string, role: string) => {
  const whereConditions =
    role === "CUSTOMER"
      ? { customerId: userId }
      : {
          technicianId: userId,
        };

  const result = await prisma.booking.findMany({
    where: whereConditions,
    include: {
      service: true,
      customer: {
        select: {
          name: true,
          phone: true,
          address: true,
        },
      },
      technician: {
        select: {
          name: true,
          phone: true,
        },
      },
    },
    orderBy: { creatdAt: "desc" },
  });
  return result;
};

// Update Technician Booking Status
const updateBookingStatusIntoDB = async (
  bookingId: string,
  technicianId: string,
  status: BookingStatus,
) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    throw new Error("Booking not found!");
  }

  if (booking.technicianId !== technicianId) {
    throw new Error("Forbidden! You are not authorized to update this booking");
  }

  const result = await prisma.booking.update({
    where: { id: bookingId },
    data: { status },
  });

  return result;
};

export const bookingService = {
  createNewBookingIntoDB,
  getMyBookingsFromDB,
  updateBookingStatusIntoDB,
};
