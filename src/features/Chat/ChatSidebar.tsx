import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiCheck, HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css";

import { useChatUsers } from "../../hooks/useChatUsers";
import { useDebounce } from "../../hooks/useDebounce";
import { getProfileImageUrl } from "../../utils/getProfileImageUrl";
import { setSelectedUser } from "../Chat/chatSlice";
import { RootState } from "../../app/store";

import EmptyChatUsers from "./EmptyChatUsers";
import Input from "../../ui/Input";
import type { ChatUser } from "../../types/chat";

const formatTime = (date?: string | null) =>
  date
    ? new Date(date).toLocaleTimeString("sr-RS", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

const ChatSidebar = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const { data: users, isLoading, error } = useChatUsers(debouncedSearch);

  const dispatch = useDispatch();
  const selectedUser = useSelector(
    (state: RootState) => state.chat.selectedUser,
  );
  const onlineUsers = useSelector((state: RootState) => state.chat.onlineUsers);

  return (
    <div className="flex h-full w-80 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-4">
        <Input
          type="text"
          placeholder="Search conversations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<HiMagnifyingGlass className="h-5 w-5 text-gray-400" />}
          rightIcon={
            search && (
              <HiXMark
                className="h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={() => setSearch("")}
              />
            )
          }
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading && (
          <div className="flex justify-center p-6">
            <Ring2
              size="24"
              stroke="3"
              strokeLength="0.25"
              bgOpacity="0.1"
              speed="0.8"
              color="#21409a"
            />
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
              <div
                key={user.id}
                onClick={() => dispatch(setSelectedUser(user))}
                className={`relative flex cursor-pointer items-center gap-3 border-b border-gray-100 px-4 py-3 transition-all ${
                  isSelected
                    ? "bg-gray-100"
                    : hasUnread
                      ? "bg-blue-50 hover:bg-blue-100/60"
                      : "hover:bg-gray-50"
                }`}
              >
                <div className="relative">
                  <div
                    className={`absolute -left-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white ${
                      isOnline ? "bg-[#1a936f]" : "bg-[#dc2626]"
                    }`}
                  />

                  <img
                    src={getProfileImageUrl(user.profile_image_path)}
                    alt={`${user.name} ${user.last_name}`}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`truncate text-sm ${
                        hasUnread
                          ? "font-semibold text-gray-900"
                          : "font-medium text-gray-800"
                      }`}
                    >
                      {user.name} {user.last_name}
                    </p>

                    <span className="shrink-0 text-[11px] text-gray-400">
                      {formatTime(user.latest_message_time)}
                    </span>
                  </div>

                  <div className="mt-0.5 flex items-center justify-between gap-2">
                    <p
                      className={`max-w-[180px] truncate text-xs ${
                        hasUnread
                          ? "font-medium text-gray-600"
                          : "text-gray-400"
                      }`}
                    >
                      {user.latest_message ?? "No messages yet"}
                    </p>

                    <div className="flex shrink-0 items-center gap-1">
                      {hasUnread ? (
                        <span className="flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-white shadow-md animate-[pulse_2s_infinite]">
                          {user.unread_count > 99 ? "99+" : user.unread_count}
                        </span>
                      ) : user.latest_message ? (
                        <div className="flex items-center text-primary">
                          <HiCheck className="-mr-1 h-4 w-4" />
                          <HiCheck className="h-4 w-4" />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ChatSidebar;
