import { useState } from "react";
import Linkify from "linkify-react";
import FileMessageBubble from "./FileMessageBubble";

interface MessageBubbleProps {
  message: string | null;
  type: "text" | "image" | "file";
  fileUrl?: string | null;
  isOwnMessage: boolean;
  time?: string;
  authAvatarUrl?: string;
  contactAvatarUrl?: string;
  onImageLoad?: () => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  type,
  fileUrl,
  isOwnMessage,
  time,
  authAvatarUrl = "http://localhost:8000/images/default-profile.png",
  contactAvatarUrl = "http://localhost:8000/images/default-profile.png",
  onImageLoad,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const isOwn = isOwnMessage;
  const avatarUrl = isOwn ? authAvatarUrl : contactAvatarUrl;

  const bubbleClasses = isOwn
    ? "bg-[#21409a] text-white shadow-md rounded-2xl rounded-br-sm dark:bg-[#2f5bff]"
    : "bg-white text-gray-800 border border-gray-200 shadow-sm rounded-2xl rounded-bl-sm dark:bg-[#1e1e1e] dark:text-gray-100 dark:border-gray-700";

  return (
    <>
      <div
        className={`mb-3 flex w-full ${
          isOwn ? "justify-end" : "justify-start"
        }`}
      >
        <div className="flex w-full min-w-0 items-end gap-3">
          {!isOwn && (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="h-8 w-8 rounded-full object-cover shadow-sm"
            />
          )}

          <div
            className={`flex flex-1 flex-col ${
              isOwn ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[70%] break-words px-4 py-2.5 text-sm transition ${bubbleClasses}`}
            >
              {type === "text" &&
                (message ? (
                  <Linkify
                    options={{
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: isOwn
                        ? "break-all text-white/90 underline"
                        : "break-all text-[#21409a] underline dark:text-blue-400",
                    }}
                  >
                    {message}
                  </Linkify>
                ) : (
                  <span className="italic text-gray-400 dark:text-gray-500">
                    Empty message
                  </span>
                ))}

              {type === "image" &&
                (fileUrl ? (
                  <img
                    src={fileUrl}
                    onLoad={onImageLoad}
                    onClick={() => setPreviewImage(fileUrl)}
                    className="mt-1 max-w-[220px] cursor-pointer rounded-xl object-cover shadow-md transition hover:scale-[1.02]"
                  />
                ) : (
                  <span className="italic text-gray-400 dark:text-gray-500">
                    Loading image...
                  </span>
                ))}

              {type === "file" &&
                (fileUrl ? (
                  <FileMessageBubble fileUrl={fileUrl} isOwn={isOwn} />
                ) : (
                  <span className="italic text-gray-400 dark:text-gray-500">
                    Loading file...
                  </span>
                ))}
            </div>

            {time && (
              <span className="mt-1 text-[11px] text-gray-400 dark:text-gray-500">
                {time}
              </span>
            )}
          </div>

          {isOwn && (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="h-8 w-8 rounded-full object-cover shadow-sm"
            />
          )}
        </div>
      </div>

      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm dark:bg-black/90"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90%] max-w-[90%] rounded-xl shadow-2xl"
          />
          <button
            className="absolute right-4 top-4 text-2xl text-white transition hover:scale-110"
            onClick={() => setPreviewImage(null)}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};

export default MessageBubble;
