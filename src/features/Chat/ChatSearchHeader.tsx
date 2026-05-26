import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import Input from "../../ui/Input";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  isDark: boolean;
};

function ChatSearchHeader({ value, onChange, onClear, isDark }: Props) {
  return (
    <div
      className={`
        p-4
        ${
          isDark
            ? "border-0 shadow-[inset_0_-1px_0_rgba(59,130,246,0.25)]"
            : "border-b border-gray-100"
        }
      `}
    >
      <Input
        type="text"
        placeholder="Search conversations..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        icon={
          <HiMagnifyingGlass className="h-5 w-5 text-gray-400 dark:text-[var(--color-iconColor)]" />
        }
        rightIcon={
          value && (
            <HiXMark
              className="h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-600 dark:text-[var(--color-iconColor)] dark:hover:text-white"
              onClick={onClear}
            />
          )
        }
      />
    </div>
  );
}

export default ChatSearchHeader;
