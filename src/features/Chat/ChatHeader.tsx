import React from "react";

type User = {
  name: string;
  last_name: string;
  profile_image_path: string;
};

type ChatHeaderProps = {
  selectedUser: User | null;
  getProfileImageUrl: (path: string) => string;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({
  selectedUser,
  getProfileImageUrl,
}) => {
  if (!selectedUser) return null;

  return (
    <div className="p-4 border-b border-gray-200 flex items-center gap-3 bg-white">
      <img
        src={getProfileImageUrl(selectedUser.profile_image_path)}
        alt={`${selectedUser.name} ${selectedUser.last_name}`}
        className="w-10 h-10 rounded-full object-cover bg-gray-300"
      />
      <p className="font-medium">
        {selectedUser.name} {selectedUser.last_name}
      </p>
    </div>
  );
};

export default ChatHeader;
