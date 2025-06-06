import ThemeProvider from "../../contexts/ThemeContext";
import Navbar from "../navigation/Navbar";

export default function NoSidebarLayout({ children }) {
  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        {/* 🧭 상단 네브바 */}
        <Navbar />

        <div className="p-4 dark:bg-zinc-800 dark:text-white">{children}</div>
      </div>
    </ThemeProvider>
  );
}
