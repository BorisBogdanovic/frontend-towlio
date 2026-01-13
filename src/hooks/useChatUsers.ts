import { useQuery } from "@tanstack/react-query";
import { fetchChatUsers, ChatUser } from "../services/chatService";

export const useChatUsers = () => {
  return useQuery<ChatUser[]>({
    queryKey: ["chat-users"],
    queryFn: fetchChatUsers,
  });
};
