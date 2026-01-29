import { HiOutlineBell } from "react-icons/hi2";

function EmptyNotifications() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-400 px-4 mt-6">
      <HiOutlineBell className="h-10 w-10 mb-3 text-gray-300" />
      <p className="text-sm text-center">
        You have no notifications at the moment.
      </p>
    </div>
  );
}

export default EmptyNotifications;
