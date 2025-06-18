import { useState, useEffect, useCallback } from "react";
import BaseLayout from "./BaseLayout";
import BasicSidebar from "../navigation/BasicSidebar";
import { Outlet } from "react-router-dom";
import StudyRoomApi from "../../api/studyRoomAPI";
import { useSelector } from "react-redux";

export default function MainLayout() {
  const [myStudyRooms, setMyStudyRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth);

  // 목록 새로고침 함수 (하위에서 호출 가능)
  const refreshStudyRooms = useCallback(async () => {
    setLoading(true);
    try {
      const rooms = await StudyRoomApi.getStudyRoomList();
      console.log("룸즈: ", rooms);

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
      SidebarComponent={() => (
        <BasicSidebar myStudyRooms={myStudyRooms} loading={loading} />
      )}
    >
      {/* Outlet의 context로 내려줌 */}
      <Outlet context={{ myStudyRooms, refreshStudyRooms, loading }} />
    </BaseLayout>
  );
}
