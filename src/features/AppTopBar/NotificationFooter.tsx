function NotificationFooter() {
  return (
    <div className="border-t border-gray-100 bg-white px-4 py-3">
      <button
        className="
      w-full
      text-sm
      font-medium
      text-gray-600
      border
      border-gray-200
      rounded-md
      py-2
      hover:bg-gray-50
      hover:text-gray-800
      transition
      cursor-pointer
    "
      >
        Clear all notifications
      </button>
    </div>
  );
}

export default NotificationFooter;
