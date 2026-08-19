import { Role } from "../../../generated/prisma/enums";

export interface RegisterCustomerPayload {
  name: string;
  email: string;
  password: string;
  role: Role;
  phone?: string;
  address?: string;
}

export type TLoginCustomer = {
  email: string;
  password: string;
};
