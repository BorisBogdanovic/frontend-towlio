import { useEffect, useState } from "react";
import { HiSun, HiMoon } from "react-icons/hi2";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // INIT (učitavanje iz localStorage)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);

  // SYNC (jedino mesto gde diramo DOM)
  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-8 flex items-center rounded-full p-1 transition-all duration-300 cursor-pointer
      ${
        isDark
          ? "bg-[#334155] border border-[#475569] hover:shadow-blue-500/20"
          : "bg-gray-200 border border-gray-300"
      }`}
    >
      {/* Glow */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-300
        ${isDark ? "shadow-[0_0_8px_rgba(59,130,246,0.4)]" : ""}`}
      />

      {/* Circle */}
      <div
        className={`w-6 h-6 rounded-full shadow-md flex items-center justify-center
        transform transition-transform duration-300
        ${isDark ? "translate-x-6 bg-[#020617]" : "translate-x-0 bg-white"}`}
      >
        {isDark ? (
          <HiMoon className="text-blue-400 text-sm" />
        ) : (
          <HiSun className="text-yellow-400 text-sm" />
        )}
      </div>
    </button>
  );
}
