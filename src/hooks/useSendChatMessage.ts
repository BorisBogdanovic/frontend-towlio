import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  sendChatMessage,
  ChatMessageResponse,
  ChatMessage,
} from "../services/chatService";

export const useSendChatMessage = (to_id: number) => {
  const queryClient = useQueryClient();

  return useMutation<ChatMessageResponse, Error, string>({
    mutationFn: (message: string) => sendChatMessage(to_id, message),
    onSuccess: (data) => {
      queryClient.setQueryData<ChatMessage[] | undefined>(
        ["chat-messages", to_id],
        (old) => (old ? [...old, data.message] : [data.message])
      );
    },
  });
};
