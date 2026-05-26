import { useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useChatMessages } from "../../hooks/useChatMessages";
import MessageBubble from "./MessageBubble";
import { getProfileImageUrl } from "../../utils/getProfileImageUrl";

interface ChatMessagesProps {
  contactId: number;
  uploadingImage?: File | null;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  contactId,
  uploadingImage,
}) => {
  const authUserId = useSelector((state: RootState) => state.auth.user?.id);
  const userImg = useSelector(
    (state: RootState) => state.auth.user?.profile_image_path,
  );
  const selectedUserImg = useSelector(
    (state: RootState) => state.chat.selectedUser?.profile_image_path,
  );

  const { data, isLoading, isError } = useChatMessages(contactId);
  const messages = data?.messages ?? [];

  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, uploadingImage, scrollToBottom]);

  const formatMinute = (date: string) =>
    new Date(date).toLocaleTimeString("sr-RS", {
      hour: "2-digit",
      minute: "2-digit",
    });

  if (!authUserId) return null;

  if (isLoading) {
    return (
      <div className="h-full p-4 text-sm text-gray-400 dark:text-[var(--color-textLightGray)]">
        Loading messages…
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-sm text-red-500">Failed to load messages</div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="
      flex-1 min-w-0 overflow-y-auto overflow-x-hidden
      bg-gray-50 p-4

      dark:bg-[var(--color-sectionBg)]
    "
    >
      {messages.map((msg, index) => {
        const next = messages[index + 1];

        const showTime =
          !next ||
          next.from_id !== msg.from_id ||
          formatMinute(next.created_at) !== formatMinute(msg.created_at);

        const isOwnMessage = Number(msg.from_id) === Number(authUserId);

        const fileUrl =
          msg.file_url ||
          (msg.file_path
            ? `${import.meta.env.VITE_API_URL}/storage/${msg.file_path}`
            : null);

        return (
          <MessageBubble
            key={msg.id}
            authAvatarUrl={getProfileImageUrl(userImg)}
            contactAvatarUrl={getProfileImageUrl(selectedUserImg)}
            message={msg.message}
            type={msg.type}
            fileUrl={fileUrl}
            isOwnMessage={isOwnMessage}
            time={showTime ? formatMinute(msg.created_at) : undefined}
            onImageLoad={scrollToBottom}
          />
        );
      })}

      {/* UPLOADING IMAGE */}
      {uploadingImage && (
        <div className="flex justify-end mb-3">
          <div className="relative max-w-[200px]">
            <img
              src={URL.createObjectURL(uploadingImage)}
              className="rounded-xl object-cover opacity-70"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 border-2 border-white border-t-transparent rounded-full animate-spin dark:border-[var(--color-textGray)] dark:border-t-transparent" />
            </div>
          </div>
        </div>
      )}

      <div className="h-6" />
    </div>
  );
};

export default ChatMessages;
