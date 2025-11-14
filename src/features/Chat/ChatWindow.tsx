function ChatWindow() {
  return (
    <div className="flex-1 h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center gap-3 bg-white">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <p className="font-medium">Chat with John Doe</p>
      </div>

      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <p className="text-gray-500">Select a conversation to start.</p>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
