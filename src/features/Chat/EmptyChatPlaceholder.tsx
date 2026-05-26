import { HiMiniChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

const EmptyChatPlaceholder = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <HiMiniChatBubbleOvalLeftEllipsis className="w-16 h-16 text-gray-400 dark:text-gray-500" />

        <div>
          <p className="text-lg font-medium text-gray-900 dark:text-gray-200">
            No conversation selected
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Select a chat to start messaging
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyChatPlaceholder;
