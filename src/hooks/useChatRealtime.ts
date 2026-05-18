import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { getPusher } from "../lib/pusher";
import { markChatAsRead } from "../services/chatService";
import { ChatMessage, ChatMessagesResponse, ChatUser } from "../types/chat";
import { playNotificationSound } from "../utils/sound";

export const useChatRealtime = () => {
  const queryClient = useQueryClient();

  const authUser = useSelector((state: RootState) => state.auth.user);
  const selectedUser = useSelector(
    (state: RootState) => state.chat.selectedUser,
  );

  const userId = authUser?.id;

  const selectedUserRef = useRef(selectedUser);

  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  useEffect(() => {
    if (!userId) return;

    const pusher = getPusher();

    const channelName = `private-chat.${userId}`;
    const channel =
      pusher.channel(channelName) || pusher.subscribe(channelName);

    const handler = async (data: ChatMessage) => {
      // ❗ ignoriši svoje poruke
      if (data.from_id === userId) return;

      const contactId = data.from_id === userId ? data.to_id : data.from_id;

      const isCurrentOpenChat = selectedUserRef.current?.id === contactId;

      // 🔔 sound samo kad treba
      if (!isCurrentOpenChat || document.hidden) {
        playNotificationSound();
      }

      // ✅ mark as read
      if (isCurrentOpenChat) {
        try {
          await markChatAsRead(contactId);
        } catch (err) {
          console.error("markAsRead error:", err);
        }
      }

      // ✅ update messages
      queryClient.setQueryData<ChatMessagesResponse | undefined>(
        ["chat-messages", contactId],
        (oldData) => {
          if (!oldData) return oldData;

          const exists = oldData.messages.some((msg) => msg.id === data.id);
          if (exists) return oldData;

          return {
            ...oldData,
            messages: [...oldData.messages, data],
          };
        },
      );

      // 🔥 fallback fetch ako nije učitan
      if (!queryClient.getQueryData(["chat-messages", contactId])) {
        queryClient.invalidateQueries({
          queryKey: ["chat-messages", contactId],
        });
      }

      // ✅ latest message za sidebar
      const latestMessage =
        data.type === "text"
          ? (data.message ?? "")
          : data.type === "image"
            ? "📷 Image"
            : data.type === "file"
              ? "📎 File"
              : "";

      // ✅ update sidebar users
      queryClient.setQueriesData<ChatUser[]>(
        {
          predicate: (query) =>
            Array.isArray(query.queryKey) && query.queryKey[0] === "chat-users",
        },
        (oldUsers) => {
          if (!oldUsers) return oldUsers;

          const updated = oldUsers.map((user) =>
            user.id === contactId
              ? {
                  ...user,
                  latest_message: latestMessage,
                  latest_message_time: data.created_at ?? null,
                  unread_count: isCurrentOpenChat
                    ? 0
                    : (user.unread_count ?? 0) + 1,
                }
              : user,
          );

          return updated.sort((a, b) => {
            if (!a.latest_message_time) return 1;
            if (!b.latest_message_time) return -1;

            return (
              new Date(b.latest_message_time).getTime() -
              new Date(a.latest_message_time).getTime()
            );
          });
        },
      );
    };

    channel.bind("message.sent", handler);

    return () => {
      channel.unbind("message.sent", handler);
      pusher.unsubscribe(channelName);
    };
  }, [userId, queryClient]);
};
