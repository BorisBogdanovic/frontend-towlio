import type { Notification } from "../AppTopBar/notificationsSlice";

type Props = {
  notification: Notification;
  onClick?: () => void;
};

function NotificationItem({ notification, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left p-3 rounded-md border border-gray-100 hover:bg-gray-50"
    >
      {notification.title && (
        <div className="text-sm font-semibold text-gray-900">
          {notification.title}
        </div>
      )}

      <div className="text-sm text-gray-700">{notification.message}</div>

      <div className="text-xs text-gray-400 mt-1">{notification.createdAt}</div>
    </button>
  );
}

export default NotificationItem;
