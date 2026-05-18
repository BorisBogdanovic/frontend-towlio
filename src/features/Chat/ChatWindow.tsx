import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { getProfileImageUrl } from "../../utils/getProfileImageUrl";
import { clearSelectedUser } from "./chatSlice";
import EmptyChatPlaceholder from "./EmptyChatPlaceholder";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useSendChatMessage } from "../../hooks/useSendChatMessage";
import { useMarkChatAsRead } from "../../hooks/useMarkChatAsRead";
import toast from "react-hot-toast";

const ChatWindow = () => {
  const dispatch = useDispatch();

  const selectedUser = useSelector(
    (state: RootState) => state.chat.selectedUser,
  );

  const { mutate: sendMessage } = useSendChatMessage();
  const { mutate: markAsRead } = useMarkChatAsRead();

  const [uploadingImage, setUploadingImage] = useState<File | null>(null);

  useEffect(() => {
    if (selectedUser) {
      markAsRead(selectedUser.id);
    }
  }, [selectedUser, markAsRead]);

  useEffect(() => {
    return () => {
      dispatch(clearSelectedUser());
    };
  }, [dispatch]);

  if (!selectedUser) return <EmptyChatPlaceholder />;

  const handleSendText = (message: string) => {
    sendMessage({
      to_id: selectedUser.id,
      message,
      type: "text",
    });
  };

  const handleSendImage = (file: File) => {
    setUploadingImage(file);

    sendMessage(
      {
        to_id: selectedUser.id,
        type: "image",
        file,
      },
      {
        onSuccess: () => setUploadingImage(null),
        onError: () => {
          setUploadingImage(null);
          toast.error("Failed to upload image");
        },
      },
    );
  };

  const handleSendFile = (file: File) => {
    sendMessage(
      {
        to_id: selectedUser.id,
        type: "file",
        file,
      },
      {
        onError: () => {
          toast.error("Failed to upload file");
        },
      },
    );
  };

  return (
    <div className="flex h-full flex-1 flex-col bg-gray-50">
      <ChatHeader
        selectedUser={selectedUser}
        getProfileImageUrl={getProfileImageUrl}
      />

      <ChatMessages
        contactId={selectedUser.id}
        uploadingImage={uploadingImage}
      />

      <ChatInput
        onSend={handleSendText}
        onSendImage={handleSendImage}
        onSendFile={handleSendFile}
      />
    </div>
  );
};

export default ChatWindow;
