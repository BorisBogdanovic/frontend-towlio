import ChatSidebar from "../features/Chat/ChatSidebar";
import ChatWindow from "../features/Chat/ChatWindow";

function InboxPage() {
  return (
    <div className="h-[calc(90vh-80px)] flex bg-white rounded-lg border border-gray-200 overflow-hidden">
      <ChatSidebar />
      <ChatWindow />
    </div>
  );
}

export default InboxPage;
