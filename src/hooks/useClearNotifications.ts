import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { clearNotifications } from "../services/notificationService";
import { setNotifications } from "../features/AppTopBar/notificationsSlice";

export const useClearNotifications = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  return useMutation({
    mutationFn: async () => {
      if (!token) throw new Error("No auth token");
      return clearNotifications(token);
    },

    onSuccess: () => {
      dispatch(setNotifications([]));
    },

    onError: (err) => {
      console.error("clearNotifications error:", err);
    },
  });
};
