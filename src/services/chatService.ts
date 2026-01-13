import { ChatMessage, ChatMessagesResponse, ChatUser } from "../types/chat";
import { getAuthToken } from "../utils/auth";
import { API_URL } from "./apiConfig";

export const fetchChatUsers = async (): Promise<ChatUser[]> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("No auth token found");

    const response = await fetch(`${API_URL}/chat/users`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || "Failed to fetch chat users");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch chat users:", error);
    throw error;
  }
};
////////////////////////////////////////////////////////////////////////////////
export const sendChatMessage = async (
  to_id: number,
  message: string
): Promise<ChatMessagesResponse> => {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("No auth token found");

    const payload = {
      to_id,
      message,
      type: "text",
      file_path: null,
      file_name: null,
      file_size: null,
      voice_duration: null,
    };

    const response = await fetch(`${API_URL}/chat/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || "Failed to send message");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to send chat message:", error);
    throw error;
  }
};
////////////////////////////////////////////////////////////////////////////////

export const fetchChatMessages = async (
  contactId: number
): Promise<ChatMessagesResponse> => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token");

  const response = await fetch(`${API_URL}/chat/messages/${contactId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || "Failed to fetch messages");
  }

  const data = await response.json();

  const messages: ChatMessage[] = (data.messages ?? []).map((msg: any) => ({
    id: msg.id,
    from_id: msg.from_id,
    to_id: msg.to_id,
    type: msg.type,
    message: msg.message,
    file_path: msg.file_path,
    file_name: msg.file_name,
    file_size: msg.file_size,
    voice_duration: msg.voice_duration,
    read_at: msg.read_at,
    created_at: msg.created_at,
    updated_at: msg.updated_at,
  }));

  return {
    contact: data.contact,
    messages,
  };
};
