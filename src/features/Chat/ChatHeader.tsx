type User = {
  name: string;
  last_name: string;
  profile_image_path: string;
};

interface ChatHeaderProps {
  selectedUser: User | null;
  getProfileImageUrl: (path: string) => string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  selectedUser,
  getProfileImageUrl,
}) => {
  if (!selectedUser) return null;

  const { name, last_name, profile_image_path } = selectedUser;

  return (
    <div
      className="
      flex items-center gap-3
      border-b border-gray-200
      bg-white p-4

      dark:border-[var(--color-borderGray)]
      dark:bg-[var(--color-sectionBg)]
    "
    >
      <img
        src={getProfileImageUrl(profile_image_path)}
        alt={`${name} ${last_name}`}
        className="h-10 w-10 rounded-full bg-gray-300 object-cover"
      />

      <p className="font-medium text-gray-800 dark:text-gray-300">
        {name} {last_name}
      </p>
    </div>
  );
};

export default ChatHeader;
