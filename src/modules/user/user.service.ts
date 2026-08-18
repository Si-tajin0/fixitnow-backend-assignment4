import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { RegisterUserPayload } from "./user.interface";

const registerUserIntoDB = async (payload: RegisterUserPayload) => {
  const { name, email, password, role } = payload;
  // Check this email before the account created
  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserExist) {
    throw new Error("User with this email already exists");
  }

  // Password Hash
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  // Created User Database
  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
    omit: {
      password: true,
    },
  });

  //   const user = await prisma.user.findUnique({
  //     where: {
  //       id: createdUser.id,
  //       email: createdUser.email || email,
  //     },
  //     omit: {
  //       password: true,
  //     },
  //   });
  return createdUser;
};

export const userService = {
  registerUserIntoDB,
};
