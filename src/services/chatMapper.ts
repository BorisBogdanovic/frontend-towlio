import { ApiChatMessage, ChatMessage } from "../types/chat";

export const mapChatMessage = (msg: ApiChatMessage): ChatMessage => ({
  id: msg.id,
  from_id: msg.from_id,
  to_id: msg.to_id,
  type: msg.type,
  message: msg.message ?? null,
  file_path: msg.file_path ?? null,
  file_name: msg.file_name ?? null,
  file_size: msg.file_size ?? null,
  voice_duration: msg.voice_duration ?? null,
  read_at: msg.read_at ?? null,
  created_at: msg.created_at,
  updated_at: msg.updated_at,
});
