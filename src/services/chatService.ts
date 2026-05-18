import {
  ChatMessagesResponse,
  ChatUser,
  SendChatMessageResponse,
  ApiChatMessagesResponse,
} from "../types/chat";
import { getAuthToken } from "../utils/auth";
import { API_URL } from "./apiConfig";
import { mapChatMessage } from "./chatMapper";

// --- Chat Users ---
export const fetchChatUsers = async (
  search: string = "",
): Promise<ChatUser[]> => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found");

  const query = search ? `?search=${encodeURIComponent(search)}` : "";

  const response = await fetch(`${API_URL}/chat/users${query}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    let message = "Failed to fetch chat users";

    try {
      const errorBody = await response.json();
      message = errorBody?.message || message;
    } catch (err) {
      console.error("Error parsing response:", err);
    }

    throw new Error(message);
  }

  const data = await response.json();
  return data.data;
};

// --- Send Message ---
export const sendChatMessage = async ({
  to_id,
  message,
  type = "text",
  file,
}: {
  to_id: number;
  message?: string;
  type?: "text" | "image" | "file";
  file?: File;
}): Promise<SendChatMessageResponse> => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found");

  const formData = new FormData();
  formData.append("to_id", String(to_id));
  formData.append("type", type);

  if (type === "text") {
    const text = message?.trim();
    if (!text) throw new Error("Message cannot be empty");
    formData.append("message", text);
  } else if (file) {
    formData.append("file", file);
  }

  const response = await fetch(`${API_URL}/chat/send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = "Failed to send message";

    try {
      const errorBody = await response.json();

      if (errorBody?.errors) {
        const firstError = Object.values(errorBody.errors)[0];

        if (Array.isArray(firstError) && firstError.length > 0) {
          errorMessage = firstError[0];
        }
      } else if (errorBody?.message) {
        errorMessage = errorBody.message;
      }
    } catch (err) {
      console.error("Error parsing response:", err);
    }

    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data as SendChatMessageResponse;
};

// --- Chat Messages ---
export const fetchChatMessages = async (
  contactId: number,
): Promise<ChatMessagesResponse> => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token");

  const response = await fetch(`${API_URL}/chat/messages/${contactId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    let message = "Failed to fetch messages";

    try {
      const errorBody = await response.json();
      message = errorBody?.message || message;
    } catch (err) {
      console.error("Error parsing response:", err);
    }

    throw new Error(message);
  }

  const data: ApiChatMessagesResponse = await response.json();

  return {
    contact: data.contact,
    messages: data.messages.map(mapChatMessage),
  };
};

// --- Mark As Read ---
export const markChatAsRead = async (contactId: number): Promise<void> => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found");

  const response = await fetch(`${API_URL}/chat/read/${contactId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    let message = "Failed to mark chat as read";

    try {
      const errorBody = await response.json();
      message = errorBody?.message || message;
    } catch (err) {
      console.error("Error parsing response:", err);
    }

    throw new Error(message);
  }
};
