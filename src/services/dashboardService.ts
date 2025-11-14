import { getAuthToken } from "../utils/auth";
import { API_URL } from "./apiConfig";

export const fetchDashboardData = async () => {
  const token = getAuthToken();
  if (!token) throw new Error("User not authenticated");
  try {
    const response = await fetch(`${API_URL}/dashboard`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch dashboard data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
