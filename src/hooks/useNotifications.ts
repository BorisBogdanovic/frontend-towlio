import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import {
  addNotification,
  setNotifications,
} from "../features/AppTopBar/notificationsSlice";
import { initPusher } from "../lib/pusher";
import { fetchNotifications } from "../services/notificationService";
import { getAuthToken } from "../utils/auth";
import { playNotificationSound } from "../utils/sound";

type BroadcastNotification = {
  id?: string;
  type?: string;
  title?: string;
  message?: string;
  created_at?: string;
  sender?: {
    id?: string;
    name?: string;
    avatar?: string | null;
  };
};

export default function useNotifications() {
  const dispatch = useDispatch();

  const userId = useSelector((s: RootState) => s.auth.user?.id);
  const reduxToken = useSelector((s: RootState) => s.auth.token);

  const token = reduxToken ?? getAuthToken();

  useEffect(() => {
    if (!userId || !token || token === "null" || token.trim() === "") {
      return;
    }

    fetchNotifications(token)
      .then((items) => {
        dispatch(setNotifications(items));
      })
      .catch((err) => {
        console.error("fetchNotifications error:", err);
      });

    const pusher = initPusher(token);
    const channelName = `private-App.Models.User.${userId}`;
    const channel =
      pusher.channel(channelName) || pusher.subscribe(channelName);

    const handler = (notification: BroadcastNotification) => {
      playNotificationSound();

      dispatch(
        addNotification({
          id: notification.id ?? crypto.randomUUID(),
          type: notification.type,
          title: notification.title ?? "Notification",
          message: notification.message ?? "New notification",
          createdAt: notification.created_at ?? new Date().toISOString(),
          unread: true,
          sender: {
            id: notification.sender?.id,
            name: notification.sender?.name ?? "Unknown User",
            avatar: notification.sender?.avatar ?? null,
          },
        }),
      );
    };

    const eventName =
      "Illuminate\\Notifications\\Events\\BroadcastNotificationCreated";

    channel.bind(eventName, handler);

    return () => {
      channel.unbind(eventName, handler);
      pusher.unsubscribe(channelName);
    };
  }, [userId, token, dispatch]);
}
