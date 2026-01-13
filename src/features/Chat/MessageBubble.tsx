import React from "react";

interface MessageBubbleProps {
  message: string;
  isReceiver: boolean;
  time?: string;
  authAvatarUrl?: string;
  contactAvatarUrl?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isReceiver,
  time,
  authAvatarUrl = "http://localhost:8000/images/default-profile.png",
  contactAvatarUrl = "http://localhost:8000/images/default-profile.png",
}) => {
  const isWhiteBubble = isReceiver;

  const bubbleClasses = isWhiteBubble
    ? "bg-white text-gray-800 rounded-2xl rounded-bl-sm shadow border border-gray-200"
    : "bg-primary text-white rounded-2xl rounded-br-sm shadow";

  const avatarToShow = isWhiteBubble ? contactAvatarUrl : authAvatarUrl;

  return (
    <div
      className={`mb-2 flex w-full ${
        isWhiteBubble ? "justify-start" : "justify-end"
      }`}
    >
      <div className="flex w-full min-w-0 items-end gap-3">
        {/* Avatar levo za beli */}
        {isWhiteBubble && (
          <img
            src={avatarToShow}
            alt="Avatar"
            className="w-8 h-8 rounded-full object-cover shrink-0"
          />
        )}

        <div
          className={`flex flex-1 min-w-0 flex-col ${
            isWhiteBubble ? "items-start" : "items-end"
          }`}
        >
          <div
            className={[
              "inline-block w-fit max-w-[65%]",
              "px-4 py-2 text-sm leading-snug",
              "whitespace-pre-wrap text-left",
              "break-normal overflow-hidden",
              bubbleClasses,
            ].join(" ")}
            style={{ overflowWrap: "anywhere", wordBreak: "normal" }}
          >
            {message}
          </div>

          {time && <span className="text-xs text-gray-400 mt-1">{time}</span>}
        </div>

        {/* Avatar desno za plavi */}
        {!isWhiteBubble && (
          <img
            src={avatarToShow}
            alt="Avatar"
            className="w-8 h-8 rounded-full object-cover shrink-0"
          />
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
