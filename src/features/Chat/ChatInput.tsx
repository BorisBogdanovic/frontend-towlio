import { HiPaperClip, HiMicrophone, HiPaperAirplane } from "react-icons/hi2";
import { useForm } from "react-hook-form";

interface ChatInputProps {
  onSend: (message: string) => void; // funkcija koja šalje poruku
}

interface FormValues {
  message: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    if (data.message.trim()) {
      onSend(data.message.trim());
      reset();
    }
  };

  return (
    <div className="p-3 border-t border-gray-200 bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 w-full"
      >
        {/* Attach file */}
        <button
          type="button"
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-primary transition cursor-pointer"
          title="Attach file"
        >
          <HiPaperClip className="w-5 h-5" />
        </button>

        {/* Text input */}
        <input
          type="text"
          placeholder="Type a message"
          autoComplete="off"
          className="
            flex-1
            py-3 px-4
            rounded-lg
            border border-disabledBorderGray
            placeholder:text-sm placeholder:leading-5
            outline-none focus:outline-none
          "
          {...register("message")}
        />

        {/* Voice message */}
        <button
          type="button"
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-primary transition cursor-pointer"
          title="Record voice"
        >
          <HiMicrophone className="w-5 h-5" />
        </button>

        {/* Send */}
        <button
          type="submit"
          className="p-2 rounded-lg text-primary flex items-center justify-center hover:bg-primary-dark transition"
          title="Send message"
        >
          <HiPaperAirplane className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
