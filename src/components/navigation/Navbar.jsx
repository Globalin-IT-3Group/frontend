import { useContext, useState } from "react";
import ThemeButton from "../themes/ThemeButton";
import LoginModal from "../modal/LoginModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav
        className="flex justify-between items-center px-6 py-4 bg-white
                dark:bg-zinc-800
                dark:shadow-[0_2px_4px_-1px_rgba(255,255,255,0.3)]
                transition-shadow duration-300
                shadow-md z-10 relative"
      >
        <h1 className="text-lg font-bold text-zinc-800 dark:text-white">
          コツコツ
        </h1>

        <div className="flex gap-4">
          <ThemeButton />
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 bg-white shadow-sm text-gray-400 border border-gray-400 rounded-xl"
          >
            로그인
          </button>
          {isOpen && <LoginModal onClose={() => setIsOpen(false)} />}
        </div>
      </nav>
    </div>
  );
}
