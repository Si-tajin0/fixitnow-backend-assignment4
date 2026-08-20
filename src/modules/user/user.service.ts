import { UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

// Get All Users
const getAllusersFromDB = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      creatdAt: true,
    },
  });
  return result;
};

// User Status Change
const changeUserStatusInDB = async (userId: string, status: UserStatus) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  const result = await prisma.user.update({
    where: { id: userId },
    data: { status },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });
  return result;
};

export const userService = {
  getAllusersFromDB,
  changeUserStatusInDB,
};
