import { getFileIcon } from "../../utils/getFileIcon";

interface Props {
  fileUrl: string;
  isOwn?: boolean;
}

const FileMessageBubble: React.FC<Props> = ({ fileUrl, isOwn }) => {
  const fileName = fileUrl.split("/").pop() || "file";
  const fileType = fileName.split(".").pop() || "";
  const icon = getFileIcon(fileType);

  return (
    <a
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`mt-1 flex max-w-[220px] items-center gap-3 rounded-lg px-3 py-2 no-underline shadow-sm transition-all duration-200 hover:shadow-md ${
        isOwn
          ? "bg-white/10 hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20"
          : "border border-gray-200 bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:bg-[#1e1e1e] dark:hover:bg-[#2a2a2a]"
      }`}
    >
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-md ${
          isOwn
            ? "bg-white/20 dark:bg-white/20"
            : "bg-gray-300 dark:bg-gray-700"
        }`}
      >
        {icon}
      </div>

      <div className="flex min-w-0 flex-col">
        <span
          className={`max-w-[150px] truncate text-[13px] font-medium ${
            isOwn ? "text-white" : "text-gray-900 dark:text-gray-100"
          }`}
        >
          {fileName}
        </span>

        <span
          className={`text-[11px] uppercase ${
            isOwn ? "text-white/70" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {fileType}
        </span>
      </div>
    </a>
  );
};

export default FileMessageBubble;
