import BaseLayout from "./BaseLayout";
import ChatSidebar from "../navigation/ChatSidebar";
import { Outlet } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import chatRoomApi from "../../api/chatRoomAPI";

function ChatLayout() {
  // 💡 채팅방 목록 State 최상위에서 관리
  const [rooms, setRooms] = useState([]);
  // 💡 목록 새로고침 함수
  const refreshRooms = useCallback(
    () =>
      chatRoomApi.getAllSummaries().then((result) => {
        setRooms(result);
      }),
    []
  );

  useEffect(() => {
    refreshRooms();
  }, [refreshRooms]);

  return (
    <BaseLayout
      SidebarComponent={
        // ChatSidebar에 rooms, setRooms, refreshRooms 모두 props로 넘김
        (props) => (
          <ChatSidebar
            rooms={rooms}
            setRooms={setRooms}
            refreshRooms={refreshRooms}
            {...props}
          />
        )
      }
    >
      {/* Outlet에 rooms, refreshRooms 전달 */}
      <Outlet context={{ rooms, refreshRooms }} />
    </BaseLayout>
  );
}

export default ChatLayout;
