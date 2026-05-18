import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Notification {
  id: string;
  type?: string;
  title?: string;
  message: string;
  createdAt: string;
  unread: boolean;
  sender?: {
    id?: string;
    name: string;
    avatar?: string | null;
  };
}

interface NotificationsState {
  items: Notification[];
  unreadCount: number;
}

const initialState: NotificationsState = {
  items: [],
  unreadCount: 0,
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications(state, { payload }: PayloadAction<Notification[]>) {
      state.items = payload;
      state.unreadCount = payload.reduce(
        (count, n) => count + (n.unread ? 1 : 0),
        0,
      );
    },

    addNotification(state, { payload }: PayloadAction<Notification>) {
      state.items.unshift(payload);
      if (payload.unread) state.unreadCount += 1;
    },

    markAllAsRead(state) {
      state.items.forEach((n) => {
        n.unread = false;
      });
      state.unreadCount = 0;
    },
  },
});

export const { setNotifications, addNotification, markAllAsRead } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
