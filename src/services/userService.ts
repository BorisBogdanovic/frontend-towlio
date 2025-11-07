import { getAuthToken } from "../utils/auth";
import { API_URL } from "./apiConfig";
import {
  ActivateResponse,
  DeactivateResponse,
  DeleteUserResponse,
  Filters,
  PaginatedResponse,
  UpdatePasswordInput,
  UpdatePasswordResponse,
  UpdateUserAvatarResponse,
  UpdateUserPayload,
  UpdateUserResponse,
  User,
} from "../types/user";

export const fetchUsers = async (
  filters: Filters = {}
): Promise<PaginatedResponse<User>> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("No auth token found");

    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value != null) params.append(key, String(value));
    });

    const response = await fetch(`${API_URL}/user?${params.toString()}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || "Failed to fetch users");
    }

    const data: PaginatedResponse<User> = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

////////////////////////////////////////////////////////////////////////////////////
export const deleteUser = async (
  userId: number
): Promise<DeleteUserResponse> => {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}/user/delete/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",

      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete user");
  }
  return data;
};
////////////////////////////////////////////////////////////////////////////////////
export const deactivateUser = async (
  userId: number
): Promise<DeactivateResponse> => {
  const token = getAuthToken();
  if (!token) throw new Error("User not authenticated");

  const response = await fetch(`${API_URL}/user/deactivate/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const data: DeactivateResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to deactivate user");
  }

  return data;
};
////////////////////////////////////////////////////////////////////////////////////
export const activateUser = async (
  userId: number
): Promise<ActivateResponse> => {
  const token = getAuthToken();
  if (!token) throw new Error("User not authenticated");

  const response = await fetch(`${API_URL}/user/activate/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const data: DeactivateResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to deactivate user");
  }

  return data;
};
////////////////////////////////////////////////////////////////////////////////////
export async function updatePassword(
  data: UpdatePasswordInput
): Promise<UpdatePasswordResponse> {
  const token = getAuthToken();

  const response = await fetch(`${API_URL}/user/change-password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update password");
  }
  return await response.json();
}
////////////////////////////////////////////////////////////////////////////////////
export const updateUser = async (
  data: UpdateUserPayload
): Promise<UpdateUserResponse> => {
  const token = getAuthToken();

  try {
    const response = await fetch(`${API_URL}/user/settings`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok || (json.status !== undefined && !json.status)) {
      throw new Error(json.message || "Failed to update user");
    }

    return json as UpdateUserResponse;
  } catch (error) {
    if (error instanceof Error) {
      return Promise.reject(error);
    }
    return Promise.reject(new Error("An unknown error occurred"));
  }
};
//////////////////////////////////////////////////////////////////////////////////

export const updateUserAvatar = async (
  file: File
): Promise<UpdateUserAvatarResponse> => {
  const token = getAuthToken();

  if (!token) throw new Error("User not authenticated");

  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const response = await fetch(`${API_URL}/user/update-image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || (data.status !== undefined && !data.status)) {
      throw new Error(data.message || "Failed to upload avatar");
    }

    return data as UpdateUserAvatarResponse;
  } catch (error) {
    if (error instanceof Error) {
      return Promise.reject(error);
    }
    return Promise.reject(new Error("An unknown error occurred"));
  }
};
