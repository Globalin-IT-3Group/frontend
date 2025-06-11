import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { LuSun, LuMoon } from "react-icons/lu";

export default function ThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "basic" : "dark")}
      className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-black dark:text-white transition"
      aria-label={isDark ? "라이트 모드" : "다크 모드"}
    >
      {isDark ? <LuSun size={20} /> : <LuMoon size={20} />}
    </button>
  );
}
