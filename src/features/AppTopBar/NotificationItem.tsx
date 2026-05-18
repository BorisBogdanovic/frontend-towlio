import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";
import type { Notification } from "../AppTopBar/notificationsSlice";
import { useMarkNotificationAsRead } from "../../hooks/useMarkNotificationAsRead";

type Props = {
  notification: Notification;
  onClick?: () => void;
};

const formatRelativeTime = (date: Date) =>
  formatDistanceToNow(date, { addSuffix: false })
    .replace("less than a minute", "now")
    .replace("about ", "")
    .replace("minutes", "m")
    .replace("minute", "m")
    .replace("hours", "h")
    .replace("hour", "h")
    .replace("days", "d")
    .replace("day", "d");

const formatFullDate = (date: Date) =>
  isToday(date)
    ? `Today at ${format(date, "HH:mm")}`
    : isYesterday(date)
      ? `Yesterday at ${format(date, "HH:mm")}`
      : format(date, "MMM d 'at' HH:mm");

const getInitials = (name?: string) =>
  name
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() ?? "?";

const NotificationItem = ({ notification, onClick }: Props) => {
  const { mutate } = useMarkNotificationAsRead();

  const date = new Date(notification.createdAt);
  const initials = getInitials(notification.sender?.name);

  const handleClick = () => {
    if (notification.unread) mutate(notification.id);
    onClick?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full cursor-pointer rounded-2xl border px-4 py-4 text-left transition-all duration-200 ${
        notification.unread
          ? "border-blue-100 bg-blue-50/60 hover:border-blue-200 hover:bg-blue-50"
          : "border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-slate-100/70"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0">
          {notification.sender?.avatar ? (
            <img
              src={notification.sender.avatar}
              alt={notification.sender.name}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
              {initials}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {notification.title && (
                <p className="truncate text-sm font-semibold text-slate-900">
                  {notification.title}
                </p>
              )}

              <p className="mt-1 text-sm leading-5 text-slate-600">
                {notification.message}
              </p>

              <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                <span>{formatFullDate(date)}</span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {notification.unread && (
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              )}

              <span className="text-xs font-medium text-slate-400">
                {formatRelativeTime(date)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default NotificationItem;
