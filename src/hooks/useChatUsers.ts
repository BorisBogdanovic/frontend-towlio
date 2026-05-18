import { useQuery } from "@tanstack/react-query";
import { fetchChatUsers } from "../services/chatService";
import type { ChatUser } from "../types/chat";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export const useChatUsers = (search: string) => {
  const token = useSelector((state: RootState) => state.auth.token);

  return useQuery<ChatUser[]>({
    queryKey: ["chat-users", search],
    queryFn: () => fetchChatUsers(search),
    enabled: Boolean(token),
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    placeholderData: (prev) => prev,
  });
};
