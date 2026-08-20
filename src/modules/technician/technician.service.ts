import { Role } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

// Get All Technicians
const getAllTechniciansFromDB = async (query: any) => {
  const { searchTerm, location, minRating } = query;

  const whereConditions: any = {
    role: "TECHNICIAN",
  };

  if (searchTerm) {
    whereConditions.name = { contains: searchTerm, mode: "insensetive" };
  }

  if (location) {
    whereConditions.address = { contains: location, mode: "insensetive" };
  }

  if (minRating) {
    whereConditions.rating = { gte: Number(minRating) };
  }

  const result = await prisma.user.findMany({
    where: whereConditions,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      address: true,
      rating: true,
      technicianProfile: true,
    },
  });
  return result;
};

// Get Technician ID
const getTechnicianByIdFromDB = async (id: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id,
      role: "TECHNICIAN",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      address: true,
      rating: true,
      technicianProfile: true,
      servicesAsTech: {
        include: {
          category: true,
        },
      },
    },
  });
  return result;
};

// Update Technician Profile
const updateTechnicianProfileIntoDB = async (userId: string, payload: any) => {
  const result = await prisma.tecnicianProfile.update({
    where: { userId },
    data: payload,
  });
  return result;
};

// Technician Update Availability
const updateAvailabilityIntoDB = async (
  userId: string,
  isAvailable: boolean,
) => {
  const result = await prisma.tecnicianProfile.update({
    where: { userId },
    data: { isAvailable },
  });
  return result;
};

export const technicianService = {
  getAllTechniciansFromDB,
  getTechnicianByIdFromDB,
  updateTechnicianProfileIntoDB,
  updateAvailabilityIntoDB,
};
