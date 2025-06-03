import { Outlet, ScrollRestoration } from "react-router-dom";
import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

export default function Layout() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div>
      {/* <Navbar /> */}

      {/* 얘는 NavBar 쪽으로 옮겨도 됨 */}
      <div className="bg-white dark:bg-zinc-800 flex items-center justify-center h-100 w-100 gap-4">
        <button
          onClick={() => setTheme("light")}
          className="bg-transparent p-3 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-black dark:text-white"
        >
          <LuSun />
        </button>
        <button
          onClick={() => setTheme("dark")}
          className="bg-transparent p-3 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-black dark:text-white"
        >
          <LuMoon />
        </button>
      </div>

      <div>
        <Outlet />
      </div>
      <ScrollRestoration />
    </div>
  );
}
