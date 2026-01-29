import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { addNotification } from "../features/AppTopBar/notificationsSlice";
import { initPusher } from "../lib/pusher";

export default function useNotifications() {
  const dispatch = useDispatch();
  const user = useSelector((s: RootState) => s.auth.user);
  const token = useSelector((s: RootState) => s.auth.token);

  useEffect(() => {
    if (!user?.id || !token) return;

    const pusher = initPusher(token);

    const channelName = `private-App.Models.User.${user.id}`;
    const channel = pusher.subscribe(channelName);

    const eventName =
      "Illuminate\\Notifications\\Events\\BroadcastNotificationCreated";

    channel.bind(eventName, (data: any) => {
      dispatch(
        addNotification({
          id: data.id ?? crypto.randomUUID(),
          type: data.type,
          title: data.title,
          message: data.message ?? "New notification",
          createdAt: data.created_at ?? new Date().toISOString(),
          unread: true,
        }),
      );
    });

    // debug (opc.)
    pusher.connection.bind("connected", () => {
      console.log("✅ PUSHER CONNECTED:", pusher.connection.socket_id);
    });
    pusher.connection.bind("error", (err: any) => {
      console.log("❌ PUSHER ERROR:", err);
    });

    return () => {
      channel.unbind(eventName);
      pusher.unsubscribe(channelName);
    };
  }, [user?.id, token, dispatch]);
}
