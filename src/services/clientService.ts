import { Client, GetClientsResponse } from "../types/client";
import { getAuthToken } from "../utils/auth";
import { API_URL } from "./apiConfig";

////////////////////////////////////////////////////////////////////////////////CREATIG CLIENT
export const createClient = async (data: Client) => {
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
////////////////////////////////////////////////////////////////////////////////LISTING CLIENT
export async function fetchClients(
  page: number = 1,
  search?: string
): Promise<GetClientsResponse> {
  const token = getAuthToken();
  if (!token) throw new Error("User not authenticated");

  try {
    // Kreiramo query param-e
    const params = new URLSearchParams();
    params.append("page", String(page));
    if (search) {
      params.append("search", search);
    }

    const res = await fetch(`${API_URL}/client?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data: GetClientsResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    return {
      status: false,
      message: "Failed to fetch clients",
      data: [],
      meta: null,
    };
  }
}
