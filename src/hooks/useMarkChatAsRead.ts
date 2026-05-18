import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markChatAsRead } from "../services/chatService";
import type { ChatUser } from "../types/chat";

type Context = {
  previousUsers?: ChatUser[];
};

export const useMarkChatAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number, Context>({
    mutationFn: (contactId) => markChatAsRead(contactId),

    onMutate: async (contactId) => {
      await queryClient.cancelQueries({ queryKey: ["chat-users"] });

      const previousUsers = queryClient.getQueryData<ChatUser[]>([
        "chat-users",
      ]);

      queryClient.setQueryData<ChatUser[]>(["chat-users"], (oldUsers) => {
        if (!oldUsers) return oldUsers;

        return oldUsers.map((user) =>
          user.id === contactId ? { ...user, unread_count: 0 } : user,
        );
      });

      return { previousUsers };
    },

    onError: (_err, _contactId, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["chat-users"], context.previousUsers);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["chat-users"] });
    },
  });
};
