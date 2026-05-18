import {
  HiPaperClip,
  HiPaperAirplane,
  HiPhoto,
  HiFaceSmile,
} from "react-icons/hi2";
import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import toast from "react-hot-toast";
import { playSendSound } from "../../utils/sound";

interface ChatInputProps {
  onSend: (message: string) => void;
  onSendImage: (file: File) => void;
  onSendFile: (file: File) => void;
}

interface FormValues {
  message: string;
}

const MAX_SIZE = 10 * 1024 * 1024;

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  onSendImage,
  onSendFile,
}) => {
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: { message: "" },
  });

  const [showEmoji, setShowEmoji] = useState(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const message = watch("message") || "";

  const playSound = () => {
    try {
      playSendSound();
    } catch (err) {
      console.error("sound error:", err);
    }
  };

  const onSubmit = ({ message }: FormValues) => {
    const trimmed = message.trim();
    if (!trimmed) return;

    playSound();
    onSend(trimmed);
    setValue("message", "");
    setShowEmoji(false);
  };

  const handleImage = (file: File) => {
    if (file.size > MAX_SIZE) {
      toast.error("Image too large (max 10MB)");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Invalid image format");
      return;
    }

    playSound();
    onSendImage(file);
  };

  const handleFile = (file: File) => {
    if (file.size > MAX_SIZE) {
      toast.error("File too large (max 10MB)");
      return;
    }

    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext !== "pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    playSound();
    onSendFile(file);
  };

  return (
    <div className="border-t border-gray-200 bg-white px-4 py-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex h-10 w-10 items-center justify-center text-gray-500 hover:text-primary"
        >
          <HiPaperClip className="h-5 w-5" />
        </button>

        <div className="relative flex flex-1 items-center rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
          <input
            type="text"
            placeholder="Write a message..."
            autoComplete="off"
            className="flex-1 border-none bg-transparent text-sm outline-none focus:ring-0"
            {...register("message")}
          />

          <input
            type="file"
            accept="image/*"
            ref={imageInputRef}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImage(file);
              e.target.value = "";
            }}
          />

          <input
            type="file"
            accept=".pdf"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />

          <div className="ml-2 flex items-center gap-2 text-gray-400">
            <button
              type="button"
              onClick={() => setShowEmoji((p) => !p)}
              className="transition hover:text-primary"
            >
              <HiFaceSmile className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="transition hover:text-primary"
            >
              <HiPhoto className="h-5 w-5" />
            </button>

            <button
              type="submit"
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-md bg-primary text-white transition hover:opacity-90"
            >
              <HiPaperAirplane className="-rotate-12 h-4 w-4" />
            </button>
          </div>

          {showEmoji && (
            <div className="absolute bottom-14 right-0 z-50">
              <EmojiPicker
                onEmojiClick={(e) => setValue("message", message + e.emoji)}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
