import { User } from "./user";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  data: User;
  token: string;
  code: number;
}

export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface RegisterFormData {
  password: string;
  password_confirmation: string;
  city: number;
  token: string;
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  password: string;
  token: string;
  password_confirmation: string;
}
