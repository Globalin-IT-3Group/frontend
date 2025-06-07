import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { LuSun, LuMoon } from "react-icons/lu";
import LoginModal from "../modal/LoginModal";

export default function ThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

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

      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 bg-white shadow-sm text-gray-400 border border-gray-400 rounded-xl"
        >
          로그인
        </button>
        {isOpen && <LoginModal onClose={() => setIsOpen(false)} />}
      </div>
    </div>
  );
}
