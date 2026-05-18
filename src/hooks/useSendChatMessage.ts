import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendChatMessage } from "../services/chatService";
import type { ChatMessage, ChatMessagesResponse } from "../types/chat";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

type SendChatMessageResponse = {
  success: boolean;
  message: ChatMessage;
};

type SendMessagePayload = {
  to_id: number;
  message?: string;
  type?: "text" | "image" | "file";
  file?: File;
};

type MutationContext = {
  previousMessages?: ChatMessagesResponse;
};

type OptimisticMessage = ChatMessage & {
  isOptimistic?: boolean;
};

export const useSendChatMessage = () => {
  const queryClient = useQueryClient();
  const authUserId = useSelector((state: RootState) => state.auth.user?.id);

  return useMutation<
    SendChatMessageResponse,
    Error,
    SendMessagePayload,
    MutationContext
  >({
    mutationFn: sendChatMessage,

    onMutate: async ({ to_id, message = "", type = "text", file }) => {
      await queryClient.cancelQueries({
        queryKey: ["chat-messages", to_id],
      });

      const previousMessages = queryClient.getQueryData<ChatMessagesResponse>([
        "chat-messages",
        to_id,
      ]);

      const optimisticMessage: OptimisticMessage = {
        id: Date.now(),
        from_id: Number(authUserId),
        to_id,
        type,
        message: message ?? "",
        file_url: file ? URL.createObjectURL(file) : null,
        file_path: null,
        file_name: file?.name ?? null,
        file_size: file?.size ?? null,
        voice_duration: null,
        read_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        isOptimistic: true,
      };

      queryClient.setQueryData<ChatMessagesResponse>(
        ["chat-messages", to_id],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            messages: [...oldData.messages, optimisticMessage],
          };
        },
      );

      return { previousMessages };
    },

    onError: (_err, { to_id }, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(
          ["chat-messages", to_id],
          context.previousMessages,
        );
      }
    },

    onSuccess: ({ message }, { to_id }) => {
      queryClient.setQueryData<ChatMessagesResponse>(
        ["chat-messages", to_id],
        (oldData) => {
          if (!oldData) return oldData;

          const messages = oldData.messages.filter(
            (msg) => !(msg as OptimisticMessage).isOptimistic,
          );

          return {
            ...oldData,
            messages: [...messages, message],
          };
        },
      );
    },
  });
};
