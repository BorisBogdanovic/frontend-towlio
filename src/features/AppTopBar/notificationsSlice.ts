import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Notification {
  id: string;
  type?: string;
  title?: string;
  message: string;
  createdAt: string;
  unread: boolean;
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
    setNotifications(state, action: PayloadAction<Notification[]>) {
      state.items = action.payload;
      state.unreadCount = action.payload.filter((n) => n.unread).length;
    },
    addNotification(state, action: PayloadAction<Notification>) {
      state.items.unshift(action.payload);
      if (action.payload.unread) state.unreadCount += 1;
    },
    markAllAsRead(state) {
      state.items.forEach((n) => (n.unread = false));
      state.unreadCount = 0;
    },
  },
});

export const { setNotifications, addNotification, markAllAsRead } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
