import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useChatMessages } from "../../hooks/useChatMessages";
import MessageBubble from "./MessageBubble";
import { getProfileImageUrl } from "../../utils/getProfileImageUrl";

interface ChatMessagesProps {
  contactId: number;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ contactId }) => {
  const authUserId = useSelector((state: RootState) => state.auth.user?.id);
  const userImg = useSelector(
    (state: RootState) => state.auth.user?.profile_image_path
  );
  const selectedUserImg = useSelector(
    (state: RootState) => state.chat.selectedUser?.profile_image_path
  );

  const { data, isLoading, isError } = useChatMessages(contactId);

  if (!authUserId) return null;
  if (isLoading) {
    return (
      <div className="p-4 h-full text-sm text-gray-400">Loading messages…</div>
    );
  }
  if (isError) {
    return (
      <div className="p-4 text-sm text-red-500">Failed to load messages</div>
    );
  }

  const messages = data?.messages ?? [];

  return (
    <div className="flex-1 min-w-0 p-4 overflow-y-auto overflow-x-hidden bg-gray-50">
      {messages.map((msg) => (
        <MessageBubble
          authAvatarUrl={getProfileImageUrl(userImg)}
          contactAvatarUrl={getProfileImageUrl(selectedUserImg)}
          key={msg.id}
          message={msg.message}
          isReceiver={msg.to_id === authUserId}
          time={new Date(msg.created_at).toLocaleTimeString("sr-RS", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        />
      ))}
      <div className="h-16" />
    </div>
  );
};

export default ChatMessages;
