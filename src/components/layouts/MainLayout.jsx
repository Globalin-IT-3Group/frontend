import { useState, useEffect, useCallback } from "react";
import BaseLayout from "./BaseLayout";
import BasicSidebar from "../navigation/BasicSidebar";
import { Outlet } from "react-router-dom";
import StudyRoomApi from "../../api/studyRoomAPI";
import { useSelector } from "react-redux";
import SidebarToggleButton from "../buttons/SidebarToggleButton"; // 경로에 맞게 조정
import MobileSidebar from "../navigation/MobileSidebar";

export default function MainLayout() {
  const [myStudyRooms, setMyStudyRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const user = useSelector((state) => state.auth);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const refreshStudyRooms = useCallback(async () => {
    setLoading(true);
    try {
      const rooms = await StudyRoomApi.getStudyRoomList();
      setMyStudyRooms(rooms);
    } catch (e) {
      console.error(e);
      setMyStudyRooms([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      refreshStudyRooms();
    } else {
      setMyStudyRooms([]);
      setLoading(false);
    }
  }, [refreshStudyRooms, user?.id]);

  return (
    <BaseLayout
      SidebarComponent={() =>
        window.innerWidth >= 1024 && (
          <BasicSidebar
            myStudyRooms={myStudyRooms}
            loading={loading}
            refreshStudyRooms={refreshStudyRooms}
          />
        )
      }
      navbarRightElement={
        <SidebarToggleButton onClick={() => setMobileSidebarOpen(true)} />
      }
    >
      <Outlet context={{ myStudyRooms, refreshStudyRooms, loading }} />
      <MobileSidebar
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        myStudyRooms={myStudyRooms}
        loading={loading}
        refreshStudyRooms={refreshStudyRooms}
      />
    </BaseLayout>
  );
}
