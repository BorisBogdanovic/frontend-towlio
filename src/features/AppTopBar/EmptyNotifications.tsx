import { HiOutlineBell } from "react-icons/hi2";

const EmptyNotifications = () => {
  return (
    <div className="mt-6 flex h-full flex-col items-center justify-center px-4 text-gray-400">
      <HiOutlineBell className="mb-3 h-10 w-10 text-gray-300" />

      <p className="text-center text-sm">
        You have no notifications at the moment.
      </p>
    </div>
  );
};

export default EmptyNotifications;
