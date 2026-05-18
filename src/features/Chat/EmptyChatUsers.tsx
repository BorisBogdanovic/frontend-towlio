import { HiChatBubbleLeftRight } from "react-icons/hi2";

function EmptyChatUsers() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        <HiChatBubbleLeftRight className="h-8 w-8 text-primary" />
      </div>

      <h3 className="text-sm font-semibold text-gray-800">
        No conversations found
      </h3>

      <p className="mt-1 max-w-[220px] text-xs leading-5 text-gray-400">
        Start a conversation or try searching for a different user.
      </p>
    </div>
  );
}

export default EmptyChatUsers;
