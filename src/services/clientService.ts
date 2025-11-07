import { CreateClientData } from "../types/client";
import { getAuthToken } from "../utils/auth";
import { API_URL } from "./apiConfig";

////////////////////////////////////////////////////////////////////////////////CREATIG CLIENT
export const createClient = async (data: CreateClientData) => {
  const token = getAuthToken();
  if (!token) throw new Error("User not authenticated");
  try {
    const response = await fetch(`${API_URL}/client/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create client");
    }

    const result = await response.json();
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Create client error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error occurred");
    }
  }
};
