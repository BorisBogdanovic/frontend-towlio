import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { getProfileImageUrl } from "../../utils/getProfileImageUrl";
import { useEffect } from "react";
import { clearSelectedUser } from "./ChatSlice";
import EmptyChatPlaceholder from "./EmptyChatPlaceholder";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useSendChatMessage } from "../../hooks/useSendChatMessage";

function ChatWindow() {
  const selectedUser = useSelector(
    (state: RootState) => state.chat.selectedUser
  );
  const dispatch = useDispatch();

  const { mutate: sendMessage } = useSendChatMessage(selectedUser?.id ?? 0);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedUser());
    };
  }, [dispatch]);

  if (!selectedUser) return <EmptyChatPlaceholder />;

  return (
    <div className="flex-1 h-full min-w-0 flex flex-col bg-gray-50">
      <ChatHeader
        selectedUser={selectedUser}
        getProfileImageUrl={getProfileImageUrl}
      />
      <ChatMessages contactId={selectedUser.id} />
      <ChatInput onSend={sendMessage} />
    </div>
  );
}

export default ChatWindow;
