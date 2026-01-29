import NotificationTabs from "./NotificationTabs";
type NotificationHeaderProps = {
  unreadCount: number;
  onMarkAllAsRead: () => void;
};
function NotificationHeader({ unreadCount }: NotificationHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-white px-4 pt-4 border-b border-gray-100">
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-900">
            Your Notifications
          </h3>

          {unreadCount > 0 && (
            <span className="text-[11px] font-medium text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>

        <button
          className="
              relative
              text-xs font-medium text-blue-600 cursor-pointer
              before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-0 before:bg-blue-600
              before:transition-all before:duration-300 before:ease-in-out
              hover:before:w-full
            "
        >
          Mark all as read
        </button>
      </div>

      <p className="text-xs text-gray-500 pb-3">Latest updates and activity</p>

      {/* TABS */}
      <NotificationTabs />
    </div>
  );
}

export default NotificationHeader;
