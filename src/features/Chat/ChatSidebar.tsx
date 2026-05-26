import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css";
import { useChatUsers } from "../../hooks/useChatUsers";
import { useDebounce } from "../../hooks/useDebounce";
import { setSelectedUser } from "../Chat/chatSlice";
import { RootState } from "../../app/store";
import { useTheme } from "../../hooks/useTheme";
import EmptyChatUsers from "./EmptyChatUsers";
import type { ChatUser } from "../../types/chat";
import ChatSearchHeader from "./ChatSearchHeader";
import ChatUserItem from "./ChatUserItem";

const formatTime = (date?: string | null) =>
  date
    ? new Date(date).toLocaleTimeString("sr-RS", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

const ChatSidebar = () => {
  const { isDark } = useTheme();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const { data: users, isLoading, error } = useChatUsers(debouncedSearch);

  const dispatch = useDispatch();
  const selectedUser = useSelector(
    (state: RootState) => state.chat.selectedUser,
  );
  const onlineUsers = useSelector((state: RootState) => state.chat.onlineUsers);

  return (
    <div
      className={`
        flex h-full w-80 flex-col
        ${
          isDark
            ? `
              bg-[#071222]
              border-0
              shadow-[
                inset_0_0_0_1px_rgba(59,130,246,0.45),
                inset_0_0_0_2px_rgba(59,130,246,0.08)
              ]
            `
            : "bg-white border-r border-gray-200"
        }
      `}
    >
      {/* SEARCH */}
      <ChatSearchHeader
        value={search}
        onChange={setSearch}
        onClear={() => setSearch("")}
        isDark={isDark}
      />

      {/* LIST */}
      <div className="flex-1 overflow-y-auto">
        {isLoading && (
          <div className="flex justify-center p-6">
            <Ring2 size="24" stroke="3" speed="0.8" color="#21409a" />
          </div>
        )}

        {error && (
          <p className="p-4 text-sm text-red-500">Failed to load users</p>
        )}

        {!isLoading && (users?.length ?? 0) === 0 && <EmptyChatUsers />}

        {!isLoading &&
          (users ?? []).map((user: ChatUser) => {
            const isSelected = selectedUser?.id === user.id;
            const hasUnread = user.unread_count > 0;
            const isOnline = onlineUsers.includes(user.id);

            return (
              <ChatUserItem
                key={user.id}
                user={user}
                isSelected={isSelected}
                hasUnread={hasUnread}
                isOnline={isOnline}
                isDark={isDark}
                onClick={() => dispatch(setSelectedUser(user))}
                formatTime={formatTime}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ChatSidebar;
