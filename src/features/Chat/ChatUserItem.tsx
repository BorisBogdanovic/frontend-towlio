import { HiCheck } from "react-icons/hi2";
import { getProfileImageUrl } from "../../utils/getProfileImageUrl";
import type { ChatUser } from "../../types/chat";

type Props = {
  user: ChatUser;
  isSelected: boolean;
  hasUnread: boolean;
  isOnline: boolean;
  isDark: boolean;
  onClick: () => void;
  formatTime: (date?: string | null) => string;
};

function ChatUserItem({
  user,
  isSelected,
  hasUnread,
  isOnline,
  isDark,
  onClick,
  formatTime,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`
        relative flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors group
        ${
          isDark
            ? `
              ${
                isSelected
                  ? "bg-[#0f1e30]"
                  : hasUnread
                    ? "bg-blue-500/10 hover:bg-blue-500/20"
                    : "hover:bg-[#0f1e30]"
              }
              border-0
              shadow-[inset_0_-1px_0_rgba(59,130,246,0.18)]
            `
            : `
              border-b border-gray-100
              ${
                isSelected
                  ? "bg-gray-100"
                  : hasUnread
                    ? "bg-blue-50 hover:bg-blue-100/60"
                    : "hover:bg-gray-50"
              }
            `
        }
      `}
    >
      {/* AVATAR */}
      <div className="relative">
        <div
          className={`
            absolute -left-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2
            ${isDark ? "border-[#071222]" : "border-white"}
            ${isOnline ? "bg-[#1a936f]" : "bg-[#dc2626]"}
          `}
        />

        <img
          src={getProfileImageUrl(user.profile_image_path)}
          alt={`${user.name} ${user.last_name}`}
          className="h-11 w-11 rounded-full object-cover"
        />
      </div>

      {/* TEXT */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <p
              className={`
                truncate text-sm
                ${
                  hasUnread
                    ? "font-semibold text-gray-900 dark:text-gray-200"
                    : "font-medium text-gray-800 dark:text-gray-400"
                }
              `}
            >
              {user.name} {user.last_name}
            </p>

            <span className="truncate text-[11px] text-gray-400 dark:text-gray-500">
              {user.email}
            </span>
          </div>

          <span className="text-[11px] text-gray-400 dark:text-[var(--color-textLightGray)]">
            {formatTime(user.latest_message_time)}
          </span>
        </div>

        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p
            className={`
              max-w-[160px] truncate text-xs
              ${
                hasUnread
                  ? "font-medium text-gray-600 dark:text-gray-300"
                  : "text-gray-400 dark:text-[var(--color-textLightGray)]"
              }
            `}
          >
            {user.latest_message ?? "No messages yet"}
          </p>

          <div className="flex items-center gap-1">
            {hasUnread ? (
              <span className="flex h-[22px] min-w-[22px] items-center justify-center rounded-full px-1.5 text-[11px] font-semibold text-white bg-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary)]">
                {user.unread_count > 99 ? "99+" : user.unread_count}
              </span>
            ) : user.latest_message ? (
              <div className="flex items-center text-[var(--color-primary)]">
                <HiCheck className="-mr-1 h-4 w-4" />
                <HiCheck className="h-4 w-4" />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatUserItem;
