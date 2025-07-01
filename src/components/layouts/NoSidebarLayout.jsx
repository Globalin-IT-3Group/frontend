import { Outlet } from "react-router-dom";
import ThemeProvider from "../../contexts/ThemeContext";
import Navbar from "../navigation/Navbar";
import { useState } from "react";
import MobileSidebar from "../navigation/MobileSidebar"; // ✅ 추가

export default function NoSidebarLayout({
  myStudyRooms = [],
  loading = false,
  refreshStudyRooms = () => {},
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen">
        {/* ✅ 햄버거 버튼 전달 */}
        <Navbar
          rightElement={
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-gray-800 dark:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          }
        />

        {/* 메인 콘텐츠 */}
        <div className="flex-1 overflow-y-auto relative dark:bg-zinc-800 dark:text-white">
          <Outlet />
        </div>

        {/* ✅ 드롭다운 사이드바 */}
        <MobileSidebar
          open={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
          myStudyRooms={myStudyRooms}
          loading={loading}
          refreshStudyRooms={refreshStudyRooms}
        />
      </div>
    </ThemeProvider>
  );
}
