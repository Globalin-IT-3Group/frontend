import ThemeProvider from "../../contexts/ThemeContext";
import { useState, useEffect } from "react";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import Navbar from "../navigation/Navbar"; // ← 상단에 고정될 네브바

export default function BaseLayout({ children, SidebarComponent }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [sidebarFullyClosed, setSidebarFullyClosed] = useState(false);
  const [sidebarClosing, setSidebarClosing] = useState(false);

  useEffect(() => {
    if (!sidebarOpen) {
      setSidebarClosing(true);
      const timer = setTimeout(() => {
        setSidebarFullyClosed(true);
        setSidebarClosing(false);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setSidebarFullyClosed(false);
      setSidebarClosing(false);
    }
  }, [sidebarOpen]);

  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        {/* 🧭 상단 네브바 */}
        <Navbar />

        {/* 🔲 아래 flex-row로 나뉜 본문 영역 */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* 사이드바 */}
          <div
            style={{
              width: sidebarOpen ? sidebarWidth : 0,
              minWidth: sidebarOpen ? "150px" : "0px",
            }}
            className="bg-zinc-100 dark:bg-zinc-900 relative transition-all duration-300 overflow-visible"
          >
            <div className="h-full">
              {SidebarComponent && <SidebarComponent />}
              {/* ＜ 닫기 버튼 */}
              {(sidebarOpen || sidebarClosing) && (
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="absolute top-4 right-0 z-50 bg-white dark:bg-zinc-800 px-1 py-2 shadow hover:bg-zinc-200 dark:hover:bg-zinc-600"
                >
                  <FiChevronsLeft className="text-xl dark:text-white" />
                </button>
              )}
              {/* 리사이즈 핸들 */}
              {sidebarOpen && (
                <div
                  onMouseDown={(e) => {
                    const startX = e.clientX;
                    const startWidth = sidebarWidth;

                    const handleMouseMove = (e) => {
                      const newWidth = startWidth + (e.clientX - startX);
                      setSidebarWidth(Math.max(150, Math.min(newWidth, 500)));
                    };

                    const handleMouseUp = () => {
                      window.removeEventListener("mousemove", handleMouseMove);
                      window.removeEventListener("mouseup", handleMouseUp);
                    };

                    window.addEventListener("mousemove", handleMouseMove);
                    window.addEventListener("mouseup", handleMouseUp);
                  }}
                  className="absolute right-0 top-0 h-full w-1 cursor-col-resize bg-zinc-300 dark:bg-zinc-800"
                />
              )}
            </div>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="flex-1 overflow-y-auto relative bg-white dark:bg-zinc-800 transition-all duration-300">
            {/* 열기 버튼 */}
            {sidebarFullyClosed && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="fixed top-22 left-0 bg-white dark:bg-zinc-800 px-1 py-2 shadow z-50 hover:bg-zinc-200 dark:hover:bg-zinc-600"
              >
                <FiChevronsRight className="text-xl dark:text-white" />
              </button>
            )}

            <div className="p-4">{children}</div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
