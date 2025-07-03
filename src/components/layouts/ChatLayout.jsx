import BaseLayout from "./BaseLayout";
import ChatSidebar from "../navigation/ChatSidebar";
import { Outlet } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import chatRoomApi from "../../api/chatRoomAPI";
import { IoMenu } from "react-icons/io5"; // 햄버거 아이콘
import { useMediaQuery } from "react-responsive"; // 데스크탑 구분용
import MobileChatSidebar from "../navigation/MobileChatSidebar";
import { useSelector } from "react-redux";

function ChatLayout() {
  const [rooms, setRooms] = useState([]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const userIdFromRedux = useSelector((state) => state.auth.id);

  // ✅ refreshRooms를 먼저 정의
  const refreshRooms = useCallback(
    () =>
      chatRoomApi.getAllSummaries().then((result) => {
        setRooms(result);
      }),
    []
  );

  // ✅ 정의된 후에 useEffect 사용
  useEffect(() => {
    refreshRooms();
  }, [refreshRooms]);

  return (
    <BaseLayout
      SidebarComponent={(props) => (
        <ChatSidebar
          rooms={rooms}
          setRooms={setRooms}
          refreshRooms={refreshRooms}
          myUserId={userIdFromRedux}
          {...props}
        />
      )}
      navbarRightElement={
        !isDesktop && (
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="lg:hidden text-2xl text-gray-800 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition cursor-pointer rounded-lg px-1"
          >
            <IoMenu />
          </button>
        )
      }
    >
      <Outlet context={{ rooms, refreshRooms }} />
      {!isDesktop && mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 bg-opacity-50 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        >
          <div
            className="absolute top-0 left-0 w-72 h-full bg-white dark:bg-zinc-700 shadow-lg p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <MobileChatSidebar
              rooms={rooms}
              refreshRooms={refreshRooms}
              onClose={() => setMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}
    </BaseLayout>
  );
}

export default ChatLayout;
