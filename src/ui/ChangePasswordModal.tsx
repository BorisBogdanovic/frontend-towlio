import { useEffect } from "react";
import { PawsordModalProps } from "../types";
import warning from "../assets/images/warning.svg";

const ChangePasswordModal = ({
  isOpen,
  title,
  message,
  onCancel,
  children,
  icon = warning,
}: PawsordModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel?.();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-lg border border-disabledBorderGray bg-white shadow-lg overflow-hidden"
      >
        {/* HEADER */}
        <div className="border-b border-disabledBorderGray bg-sectionBg px-6 py-4">
          <span className="text-lg font-semibold text-textGray">{title}</span>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col gap-4 px-6 py-6">
          {message && (
            <>
              <img src={icon} alt="" className="mx-auto mb-2" />
              <p className="text-center text-sm text-textGray">{message}</p>
            </>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
