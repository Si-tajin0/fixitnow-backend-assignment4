import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { jwtUtils } from "../../utitls/jwt";
import { RegisterCustomerPayload, TLoginCustomer } from "./auth.interface";

// Create Register User
const registerCustomerIntoDB = async (payload: RegisterCustomerPayload) => {
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

// Create Login User
const loginCustomer = async (payload: TLoginCustomer) => {
  // check if the user is in the database.
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  // Check Password

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new Error("Incorrect password");
  }

  const { password: _, ...needsPasswordUser } = user;

  // JWT Token Create Payload

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  // create JWT access token
  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in,
  );

  // JWT Refresh Token
  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in,
  );

  return {
    accessToken,
    refreshToken,
    user: needsPasswordUser,
  };
};

// Create Get My Profile
const getCustomerProfileFromDB = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    omit: {
      password: true,
    },
  });
  return user;
};

export const authService = {
  loginCustomer,
  registerCustomerIntoDB,
  getCustomerProfileFromDB,
};
