function ChatSidebar() {
  return (
    <div className="w-80 h-full border-r border-gray-200 flex flex-col bg-white">
      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>

      {/* Users list */}
      <div className="flex-1 overflow-y-auto">
        {/* Single user item */}
        <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-xs text-gray-500">Last message preview...</p>
          </div>
        </div>

        <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div>
            <p className="font-medium">Sarah Smith</p>
            <p className="text-xs text-gray-500">Typing...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatSidebar;
