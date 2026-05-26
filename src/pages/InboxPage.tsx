import ChatSidebar from "../features/Chat/ChatSidebar";
import ChatWindow from "../features/Chat/ChatWindow";
import { useTheme } from "../hooks/useTheme";

function InboxPage() {
  const { isDark } = useTheme();

  return (
    <div
      className={`
        h-[calc(90vh-80px)]
        flex
        rounded-xl
        ${
          isDark
            ? `
              bg-[#071222]
              border border-transparent
              shadow-[inset_0_0_0_1px_rgba(59,130,246,0.22),0_0_10px_rgba(59,130,246,0.10)]
            `
            : "bg-white border border-gray-300"
        }
      `}
    >
      {/* 🔥 OVDE ide overflow da ne ubije shadow */}
      <div className="flex flex-1 overflow-hidden rounded-xl">
        <ChatSidebar />
        <ChatWindow />
      </div>
    </div>
  );
}

export default InboxPage;
