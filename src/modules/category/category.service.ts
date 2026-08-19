import { prisma } from "../../lib/prisma";

// Create Category
const createCategoryIntoDB = async (payload: any) => {
  const result = await prisma.category.create({
    data: payload,
  });

  return result;
};

// Get All Category
const getAllCategoryIntoDB = async () => {
  const result = await prisma.category.findMany({});
  return result;
};

export const categoryService = {
  createCategoryIntoDB,
  getAllCategoryIntoDB,
};
