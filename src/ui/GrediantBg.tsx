import { useTheme } from "../hooks/useTheme";

function GrediantBg() {
  const { isDark } = useTheme();

  return (
    <div
      className={`
        w-full h-[576px] absolute
        ${
          isDark
            ? "bg-[#020b1b]"
            : "bg-[linear-gradient(to_bottom,var(--color-bdoBlueDark),var(--color-bdoBlueLight))] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)]"
        }
      `}
    ></div>
  );
}

export default GrediantBg;
