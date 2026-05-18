import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { markNotificationAsRead } from "../services/notificationService";
import { setNotifications } from "../features/AppTopBar/notificationsSlice";

export const useMarkNotificationAsRead = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const notifications = useSelector(
    (state: RootState) => state.notifications.items,
  );

  return useMutation({
    mutationFn: async (notificationId: string) => {
      if (!token) throw new Error("No auth token");
      return markNotificationAsRead(token, notificationId);
    },

    onSuccess: (_, notificationId) => {
      dispatch(
        setNotifications(
          notifications.map((n) =>
            n.id === notificationId ? { ...n, unread: false } : n,
          ),
        ),
      );
    },

    onError: (err) => {
      console.error("markNotificationAsRead error:", err);
    },
  });
};
