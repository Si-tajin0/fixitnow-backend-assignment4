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

export const bookingService = {
  createNewBookingIntoDB,
};
