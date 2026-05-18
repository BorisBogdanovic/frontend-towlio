import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  to: string;
  icon: ReactNode;
  label: string;
  nested?: boolean;
  unreadCount?: number;
};

export default function SidebarLink({
  to,
  icon,
  label,
  nested,
  unreadCount,
}: Props) {
  // 🔥 ključna logika
  const hasUnread = (unreadCount ?? 0) > 0;

  return (
    <NavLink to={to}>
      <div
        className={`
          mb-2 flex items-center rounded-lg py-2
          ${nested ? "pl-10" : "pl-3"}
          cursor-pointer transition-all hover:bg-sectionBg
        `}
      >
        {icon}

        <div className="ml-2 flex flex-1 items-center justify-between">
          <span
            className={`
              text-base leading-6
              ${hasUnread ? "text-primary font-semibold" : "text-textGray"}
            `}
          >
            {label}
          </span>

          {/* 🔥 badge se NE RENDERUJE ako nema poruka */}
          {hasUnread && (
            <span
              className="
                mr-4
                min-w-[20px] h-[20px]
                px-1.5
                flex items-center justify-center
                rounded-full
                bg-primary text-white
                text-[11px] font-semibold
                shadow-md
              "
            >
              {unreadCount! > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>
      </div>
    </NavLink>
  );
}
