import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

import NotificationFooter from "./NotificationFooter";
import NotificationItem from "./NotificationItem";
import NotificationHeader from "./NotificationHeader";
import EmptyNotifications from "./EmptyNotifications";

const NotificationDropdown = () => {
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  const notifications = useSelector(
    (state: RootState) => state.notifications.items,
  );

  const unreadCount = useSelector(
    (state: RootState) => state.notifications.unreadCount,
  );

  const filteredNotifications =
    activeTab === "unread"
      ? notifications.filter((n) => n.unread)
      : notifications;

  // const handleNotificationClick = (_id: string) => {
  //   // future: navigation / open details
  // };

  return (
    <div className="relative z-10 flex w-full flex-col overflow-hidden rounded-b-md border border-gray-200 bg-white shadow-lg">
      <NotificationHeader
        unreadCount={unreadCount}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
      />

      <div className="flex-1 min-h-[360px] max-h-[360px] overflow-y-auto px-2 py-2">
        {filteredNotifications.length === 0 ? (
          <EmptyNotifications />
        ) : (
          <div className="flex flex-col gap-2">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                // onClick={() => handleNotificationClick(notification.id)}
              />
            ))}
          </div>
        )}
      </div>

      <NotificationFooter />
    </div>
  );
};

export default NotificationDropdown;
