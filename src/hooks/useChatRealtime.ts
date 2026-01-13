import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { getPusher } from "../lib/pusher";
import { ChatMessage } from "../types/chat";

export const useChatRealtime = () => {
  const queryClient = useQueryClient();
  const authUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!authUser) return;
    const pusher = getPusher();
    if (!pusher) {
      console.warn("Pusher not initialized");
      return;
    }

    const channelName = `private-chat.${authUser.id}`;
    const channel = pusher.subscribe(channelName);

    channel.bind(".message.sent", (data: ChatMessage) => {
      if (data.from_id === authUser.id) return;

      queryClient.setQueryData<ChatMessage[]>(
        ["chat-messages", data.from_id],
        (oldMessages) => (oldMessages ? [...oldMessages, data] : [data])
      );
    });

    return () => {
      channel.unbind(".message.sent");
      pusher.unsubscribe(channelName);
    };
  }, [authUser, queryClient]);
};
