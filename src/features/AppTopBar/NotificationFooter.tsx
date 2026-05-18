import { useClearNotifications } from "../../hooks/useClearNotifications";

const NotificationFooter = () => {
  const { mutate, isPending } = useClearNotifications();

  return (
    <div className="border-t border-gray-100 bg-white px-4 py-3">
      <button
        type="button"
        onClick={() => mutate()}
        disabled={isPending}
        className="w-full rounded-md border border-gray-200 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Clearing..." : "Clear all notifications"}
      </button>
    </div>
  );
};

export default NotificationFooter;
