import { API_URL } from "../services/apiConfig";
import { getAuthToken } from "../utils/auth";
///////////////////////////////////////////////////////////////////////// GET CITIES
export const fetchCities = async () => {
  try {
    const response = await fetch(`${API_URL}/cities`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch cities");
    }
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Unexpected error fetching cities");
    }
    throw new Error("Unknown error fetching cities");
  }
};
///////////////////////////////////////////////////////////////////////// GET STATUSES
export const fetchStatuses = async () => {
  try {
    const response = await fetch(`${API_URL}/statuses`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch statuses");
    }
    const data = await response.json();
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Unexpected error fetching statuses");
    }
    throw new Error("Unknown error fetching statuses");
  }
};
///////////////////////////////////////////////////////////////////////// GET CAR BRANDS
export const fetchCarBrands = async (query: string) => {
  const token = getAuthToken();
  if (!token) throw new Error("User not authenticated");
  try {
    const response = await fetch(`${API_URL}/car-brands?q=${query}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch car brands");
    }

    const data = await response.json();
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Unexpected error fetching car brands");
    }
    throw new Error("Unknown error fetching car brands");
  }
};
///////////////////////////////////////////////////////////////////////// GET CAR MODELS
export const fetchCarModels = async (
  brandId?: number | string | null,
  query = ""
) => {
  if (!brandId) return [];

  const token = getAuthToken();
  if (!token) throw new Error("User not authenticated");

  const params = new URLSearchParams({ brand_id: String(brandId) });
  if (query) params.append("q", query);

  try {
    const response = await fetch(`${API_URL}/car-models?${params.toString()}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch car models");
    }

    const data = await response.json();
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Unexpected error fetching car models");
    }
    throw new Error("Unknown error fetching car models");
  }
};
///////////////////////////////////////////////////////////////////////// GET CAR MODELS
export const fetchServices = async () => {
  const token = getAuthToken();
  if (!token) throw new Error("User not authenticated");
  try {
    const response = await fetch(`${API_URL}/service`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch services");
    }
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message || "Unexpected error fetching cities");
    }
    throw new Error("Unknown error fetching cities");
  }
};
