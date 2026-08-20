import { prisma } from "../../lib/prisma";

// Get All Technicians
const getAllTechniciansFromDB = async () => {
  const result = await prisma.user.findMany({
    where: {
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

export const technicianService = {
  getAllTechniciansFromDB,
  getTechnicianByIdFromDB,
};
