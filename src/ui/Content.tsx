import { ReactNode } from "react";

type ContentProps = {
  children: ReactNode;
};

function Content({ children }: ContentProps) {
  return (
    <div
      className="
        p-4
        rounded-lg
        bg-white
        shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)]

        dark:bg-[var(--color-sectionBg)]
        dark:shadow-none
      "
    >
      {children}
    </div>
  );
}

export default Content;
