import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { setNotifications } from "../features/AppTopBar/notificationsSlice";
import { markAllNotificationsAsRead } from "../services/notificationService";

export const useMarkAllNotificationsAsRead = () => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.auth.token);
  const notifications = useSelector(
    (state: RootState) => state.notifications.items,
  );

  return useMutation({
    mutationFn: async () => {
      if (!token) throw new Error("No auth token");
      return markAllNotificationsAsRead(token);
    },

    onSuccess: () => {
      dispatch(
        setNotifications(
          notifications.map((n) => ({
            ...n,
            unread: false,
          })),
        ),
      );
    },

    onError: (err) => {
      console.error("markAllNotificationsAsRead error:", err);
    },
  });
};
