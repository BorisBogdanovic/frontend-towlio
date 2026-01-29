import { HiOutlineBell } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { getProfileImageUrl } from "../../utils/getProfileImageUrl";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import NotificationDropdown from "./NotificationDropdown";
import { motion, AnimatePresence } from "framer-motion";

function NotificationBar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const unreadCount = useSelector(
    (s: RootState) => s.notifications.unreadCount,
  );

  const [open, setOpen] = useState(false);
  const bellRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; right: number } | null>(null);

  const updatePos = () => {
    const rect = bellRef.current?.getBoundingClientRect();
    if (!rect) return;

    setPos({
      top: rect.bottom + 12,
      right: window.innerWidth - rect.right,
    });
  };

  useLayoutEffect(() => {
    if (open) updatePos();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handle = () => updatePos();
    window.addEventListener("resize", handle);
    window.addEventListener("scroll", handle, true);

    return () => {
      window.removeEventListener("resize", handle);
      window.removeEventListener("scroll", handle, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedBell = bellRef.current?.contains(target);
      const clickedDropdown = dropdownRef.current?.contains(target);

      if (!clickedBell && !clickedDropdown) setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="w-[360px] flex justify-end items-center gap-2.5">
      <motion.button
        ref={bellRef}
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative"
        aria-label="Open notifications"
        aria-expanded={open}
      >
        <HiOutlineBell className="h-7 w-7 text-iconColor cursor-pointer" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[11px] font-semibold rounded-full flex items-center justify-center leading-none">
            {unreadCount}
          </span>
        )}
      </motion.button>

      {createPortal(
        <AnimatePresence>
          {open && pos && (
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              style={{
                position: "fixed",
                top: pos.top,
                right: pos.right,
                transformOrigin: "top right",
              }}
              className="w-96 bg-white shadow-xl border border-gray-200 z-[9999] rounded-b-md overflow-hidden"
            >
              <NotificationDropdown />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}

      <div className="w-10 h-10 rounded-full bg-white overflow-hidden border-2 border-[#ECECEC]">
        {user && (
          <img
            src={getProfileImageUrl(user.profile_image_path)}
            alt="profile"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
}

export default NotificationBar;
