import { useChatUsers } from "../../hooks/useChatUsers"; // proveri putanju!
import { getProfileImageUrl } from "../../utils/getProfileImageUrl";
import { Ring2 } from "ldrs/react";
import "ldrs/react/Ring2.css";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../Chat/ChatSlice";
import { RootState } from "../../app/store";

function ChatSidebar() {
  const { data: users, isLoading, error } = useChatUsers();

  const dispatch = useDispatch();

  const selectedUser = useSelector(
    (state: RootState) => state.chat.selectedUser
  );

  return (
    <div className="w-80 h-full border-r border-gray-200 flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>
      {/* Users list */}
      <div className="flex-1 overflow-y-auto">
        {isLoading && (
          <Ring2
            size="24"
            stroke="3"
            strokeLength="0.25"
            bgOpacity="0.1"
            speed="0.8"
            color="#21409a"
          />
        )}
        {error && <p className="p-4 text-red-500">Failed to load users</p>}
        {!isLoading &&
          users?.map((user) => {
            const isSelected = selectedUser?.id === user.id;

            return (
              <div
                key={user.id}
                onClick={() => dispatch(setSelectedUser(user))}
                className={`px-4 py-3 cursor-pointer flex items-center gap-3
          ${isSelected ? "bg-gray-100" : "hover:bg-gray-100"}
        `}
              >
                <div className="relative">
                  <div className="absolute w-3.5 h-3.5 rounded-full bg-activeText border-2 border-white top-0 left-0 -translate-x-1/4 -translate-y-1/4"></div>
                  <img
                    src={getProfileImageUrl(user.profile_image_path)}
                    alt={`${user.name} ${user.last_name}`}
                    className="w-10 h-10 rounded-full object-cover bg-gray-300"
                  />
                </div>

                <div>
                  <p className="font-medium">
                    {user.name} {user.last_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Last message preview...
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ChatSidebar;
