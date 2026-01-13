import { HiMiniChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

const EmptyChatPlaceholder = () => {
  return (
    <div className="flex-1 h-full flex flex-col items-center justify-center bg-white">
      <HiMiniChatBubbleOvalLeftEllipsis className="w-16 h-16 text-gray-500" />
      <p className="text-gray-500">Select a conversation to start.</p>
    </div>
  );
};

export default EmptyChatPlaceholder;
