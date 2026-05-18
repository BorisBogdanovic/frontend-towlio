import type { Notification } from "../features/AppTopBar/notificationsSlice";
import {
  BackendNotification,
  MarkAsReadResponse,
  MarkAllAsReadResponse,
} from "../types/notification";

const API_URL = import.meta.env.VITE_API_URL;

// --- Fetch Notifications ---
export async function fetchNotifications(
  token: string,
): Promise<Notification[]> {
  const res = await fetch(`${API_URL}/api/v1/notifications`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch notifications");
  }

  const data: BackendNotification[] = await res.json();

  return data.map((n) => ({
    id: n.id,
    type: n.type,
    title: n.title,
    message: n.message,
    createdAt: n.created_at,
    unread: n.read_at === null,
    sender: {
      id: n.sender?.id,
      name: n.sender?.name ?? "Unknown User",
      avatar: n.sender?.avatar ?? null,
    },
  }));
}

// --- Clear Notifications ---
export async function clearNotifications(token: string): Promise<void> {
  const res = await fetch(`${API_URL}/api/v1/notifications/clear`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to clear notifications");
  }
}

// --- Mark One As Read ---
export async function markNotificationAsRead(
  token: string,
  notificationId: string,
): Promise<MarkAsReadResponse> {
  const res = await fetch(
    `${API_URL}/api/v1/notifications/${notificationId}/read`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );

  const data: MarkAsReadResponse = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Failed to mark notification as read");
  }

  return data;
}

// --- Mark All As Read ---
export async function markAllNotificationsAsRead(
  token: string,
): Promise<MarkAllAsReadResponse> {
  const res = await fetch(`${API_URL}/api/v1/notifications/mark-all-read`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const data: MarkAllAsReadResponse = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Failed to mark all notifications as read");
  }

  return data;
}
