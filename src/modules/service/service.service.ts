import { prisma } from "../../lib/prisma";
import { TServicePayload } from "./service.interface";

// create Service
const createServiceIntoDB = async (
  technicianId: string,
  payload: TServicePayload,
) => {
  const result = await prisma.service.create({
    data: {
      ...payload,
      technicianId,
    },
    include: {
      category: true,
      technician: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
  return result;
};

// Get All Service
const getAllServiceintoDB = async (query: any) => {
  const { searchTerm, categoryId, minPrice, maxPrice, location, rating } =
    query;

  const whereConditions: any = {};

  // Search filter
  if (searchTerm) {
    whereConditions.OR = [
      { name: { contains: searchTerm, mode: "insensitive" } },
      { description: { contains: searchTerm, mode: "insensitive" } },
    ];
  }

  // Category Filter
  if (categoryId) {
    whereConditions.categoryId = categoryId;
  }

  // Price Filter
  if (minPrice || maxPrice) {
    whereConditions.price = {};
    if (minPrice) whereConditions.price.gte = Number(minPrice);
    if (maxPrice) whereConditions.price.lte = Number(maxPrice);
  }

  // Location and Rating filter
  if (location || rating) {
    whereConditions.technician = {};

    if (location) {
      whereConditions.technician.address = {
        contains: location.trim(),
        mode: "insensitive",
      };
    }
    if (rating) {
      whereConditions.technician.rating = { gte: Number(rating) };
    }
  }

  const result = await prisma.service.findMany({
    where: whereConditions,
    include: {
      category: true,
      technician: {
        select: { id: true, name: true, address: true, rating: true },
      },
    },
  });

  return result;
};
export const serviceService = {
  createServiceIntoDB,
  getAllServiceintoDB,
};
