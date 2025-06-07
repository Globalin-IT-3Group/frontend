import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { LuSun, LuMoon } from "react-icons/lu";

export default function ThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setTheme("basic")}
        className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-black dark:text-white"
        aria-label="라이트 모드"
      >
        <LuSun size={20} />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-black dark:text-white"
        aria-label="다크 모드"
      >
        <LuMoon size={20} />
      </button>
    </div>
  );
}
