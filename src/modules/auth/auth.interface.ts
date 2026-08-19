import { Role } from "../../../generated/prisma/enums";

export type TTechnicianProfile = {
  skills: string[];
  experience: number;
  pricing: number;
};

export interface RegisterCustomerPayload {
  name: string;
  email: string;
  password: string;
  role: Role;
  phone?: string;
  address?: string;
  technicianProfile?: TTechnicianProfile;
}

export type TLoginCustomer = {
  email: string;
  password: string;
};
