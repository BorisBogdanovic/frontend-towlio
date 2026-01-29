function NotificationTabs() {
  return (
    <div className="flex border-t border-gray-100">
      <button
        className="
              flex-1
              py-2
              text-sm
              font-medium
              text-blue-600
              border-b-2
              border-blue-600
              cursor-pointer
            "
      >
        All
      </button>

      <button
        className="
              flex-1
              py-2
              text-sm
              font-medium
              text-gray-400
              hover:text-gray-700
              cursor-pointer
            "
      >
        Unread
      </button>
    </div>
  );
}

export default NotificationTabs;
