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

export const bookingService = {
  createNewBookingIntoDB,
  getMyBookingsFromDB,
};
