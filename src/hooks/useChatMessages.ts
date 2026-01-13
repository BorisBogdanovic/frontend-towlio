import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchChatMessages } from "../services/chatService";
import { ChatMessagesResponse } from "../types/chat";

export const useChatMessages = (
  contactId: number
): UseQueryResult<ChatMessagesResponse, Error> => {
  return useQuery({
    queryKey: ["chat-messages", contactId],
    queryFn: () => fetchChatMessages(contactId),
    enabled: !!contactId,
  });
};
