import { ReactNode } from "react";

type ContentHeadingProps = {
  children: ReactNode;
  isDark?: boolean;
};

function ContentHeading({ children, isDark }: ContentHeadingProps) {
  return (
    <div
      className={`
        p-4 rounded-t-lg
        ${
          isDark
            ? "bg-[#061222] border-b border-white/10 shadow-[inset_0_1px_0_rgba(59,130,246,0.18),inset_1px_0_0_rgba(59,130,246,0.18),inset_-1px_0_0_rgba(59,130,246,0.18)]"
            : "bg-sectionBg border-b border-b-disabledBorderGray"
        }
      `}
    >
      <span className="text-base leading-6 font-semibold text-textGray">
        {children}
      </span>
    </div>
  );
}

export default ContentHeading;
