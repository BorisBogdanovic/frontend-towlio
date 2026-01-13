export interface ChatUser {
  id: number;
  name: string;
  last_name: string;
  profile_image_path: string;
}

export interface ChatMessage {
  id: number;
  from_id: number;
  to_id: number;
  type: string;
  message: string;
  file_path: string | null;
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
