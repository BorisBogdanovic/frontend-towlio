import { BaseUser } from "./user";

export interface ChatUser {
  id: number;

  name: string;

  last_name: string;

  profile_image_path: string;

  latest_message: string | null;

  latest_message_time: string | null;

  unread_count: number;
}
export interface ChatMessage {
  id: number;
  from_id: number;
  to_id: number;

  type: "text" | "image" | "file";

  message: string | null;

  file_path: string | null;
  file_url?: string | null;

  file_name: string | null;
  file_size: number | null;

  voice_duration: number | null;

  read_at: string | null;

  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: number;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  profile_image_path: string;
  status_id: number;
  city_id: number;
  created_at: string;
  updated_at: string;
}

export interface ChatMessagesResponse {
  contact: Contact;
  messages: ChatMessage[];
}

export interface ApiChatMessage {
  id: number;
  from_id: number;
  to_id: number;
  type: "text" | "image" | "file";
  message?: string | null;
  file_path?: string | null;
  file_name?: string | null;
  file_size?: number | null;
  voice_duration?: number | null;
  read_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApiChatMessagesResponse {
  contact: Contact;
  messages: ApiChatMessage[];
}

export interface SendChatMessageResponse {
  success: boolean;
  message: ChatMessage;
}

export interface ChatUser extends BaseUser {
  latest_message: string | null;
  latest_message_time: string | null;
  unread_count: number;
  email: string;
}
