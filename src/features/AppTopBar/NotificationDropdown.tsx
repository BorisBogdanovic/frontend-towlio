import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import NotificationFooter from "./NotificationFooter";
import NotificationItem from "./NotificationItem";
import NotificationHeader from "./NotificationHeader";
import EmptyNotifications from "./EmptyNotifications";
import { markAllAsRead } from "../AppTopBar/notificationsSlice";

function NotificationDropdown() {
  const dispatch = useDispatch<AppDispatch>();

  const notifications = useSelector(
    (state: RootState) => state.notifications.items,
  );
  const unreadCount = useSelector(
    (state: RootState) => state.notifications.unreadCount,
  );

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const handleNotificationClick = (id: string) => {
    // ovde kasnije: navigate / open detalje / markSingleAsRead(id)
    // trenutno ništa
    console.log("clicked notification:", id);
  };

  return (
    <div className="relative z-10 w-full overflow-hidden rounded-b-md border border-gray-200 bg-white shadow-lg flex flex-col">
      <NotificationHeader
        unreadCount={unreadCount}
        onMarkAllAsRead={handleMarkAllAsRead}
      />

      <div className="flex-1 min-h-[360px] max-h-[360px] overflow-y-auto px-2 py-2">
        {notifications.length === 0 ? (
          <EmptyNotifications />
        ) : (
          <div className="flex flex-col gap-2">
            {notifications.map((n) => (
              <NotificationItem
                key={n.id}
                notification={n}
                onClick={() => handleNotificationClick(n.id)}
              />
            ))}
          </div>
        )}
      </div>

      <NotificationFooter />
    </div>
  );
}

export default NotificationDropdown;
