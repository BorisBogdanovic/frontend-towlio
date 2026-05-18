import NotificationTabs from "./NotificationTabs";
import { useMarkAllNotificationsAsRead } from "../../hooks/useMarkAllNotificationsAsRead";

type Tab = "all" | "unread";

interface NotificationHeaderProps {
  unreadCount: number;
  activeTab: Tab;
  onChangeTab: (tab: Tab) => void;
}

const NotificationHeader = ({
  unreadCount,
  activeTab,
  onChangeTab,
}: NotificationHeaderProps) => {
  const { mutate, isPending } = useMarkAllNotificationsAsRead();

  const isDisabled = unreadCount === 0 || isPending;

  return (
    <div className="sticky top-0 z-10 border-b border-gray-100 bg-white px-4 pt-4">
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-900">
            Your Notifications
          </h3>

          {unreadCount > 0 && (
            <span className="rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
              {unreadCount} new
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => mutate()}
          disabled={isDisabled}
          className="relative cursor-pointer text-xs font-medium text-blue-600 disabled:cursor-not-allowed disabled:opacity-50 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-0 before:bg-blue-600 before:transition-all before:duration-300 before:ease-in-out hover:before:w-full"
        >
          {isPending ? "Loading..." : "Mark all as read"}
        </button>
      </div>

      <p className="pb-3 text-xs text-gray-500">Latest updates and activity</p>

      <NotificationTabs activeTab={activeTab} onChangeTab={onChangeTab} />
    </div>
  );
};

export default NotificationHeader;
