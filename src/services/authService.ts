import {
  LoginPayload,
  LoginResponse,
  RegisterFormData,
  ResetPasswordPayload,
} from "../types/auth";
import { RegisterResponse } from "../types/user";
import { API_URL } from "./apiConfig";

///////////////////////////////////////////////////////////////////////// LOGIN
export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data: LoginResponse = await response.json();
    if (!response.ok || !data.status) {
      throw new Error(data.message || "Login failed.");
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Something went wrong during login.");
    }
  }
};
///////////////////////////////////////////////////////////////////////// LGOUT
export const logoutApi = async (token: string) => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to logout");
  }

  return await response.json();
};
////////////////////////////////////////////////////////////////////// REGISTER
export async function registerUser({
  token,
  ...registerData
}: RegisterFormData): Promise<RegisterResponse> {
  try {
    const response = await fetch(`${API_URL}/auth/register/${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(registerData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Registration failed");
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Unexpected registration error");
    } else {
      throw new Error("An unknown error occurred during registration.");
    }
  }
}
///////////////////////////////////////////////////////////////////////// FORGOT PASSWORD
export const sendResetLink = async (
  email: string
): Promise<{ status: string }> => {
  try {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.status || "Unable to send reset link.");
    }

    return data;
  } catch (error) {
    console.error("Error in sendResetLink:", error);
    throw new Error("Network or server error. Please try again later.");
  }
};
///////////////////////////////////////////////////////////////////////// RESET PASSWORD
export async function resetForgotPassword(data: ResetPasswordPayload) {
  try {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        password_confirmation: data.password,
        token: data.token,
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Password reset failed");
    }
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Network error");
    }
  }
}
