import { useEffect, useState } from "react";
import NotificationApi from "../../api/notificationAPI";
import AlarmList from "../../components/alarms/AlarmList";
import KotsuKotsuLoader from "../../components/loadings/KotsuKotsuLoader";
import { PiMailbox } from "react-icons/pi";
import { FaUserFriends } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { GrUserManager } from "react-icons/gr";
import { FaBell } from "react-icons/fa";

const ALARM_TABS = [
  { label: "전체", type: null, icon: <PiMailbox /> },
  { label: "친구", type: "FRIEND", icon: <FaUserFriends /> },
  { label: "스터디", type: "STUDY", icon: <SiGoogleclassroom /> },
  { label: "시스템", type: "SYSTEM", icon: <GrUserManager /> },
  { label: "채팅", type: "CHAT", icon: <IoChatbubbleEllipsesOutline /> },
];

export default function AlarmPage() {
  const [alarms, setAlarms] = useState([]);
  const [activeTab, setActiveTab] = useState(ALARM_TABS[0]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    NotificationApi.getNotificationsPage({
      page,
      size: 10,
      sort: "createdAt,desc",
    })
      .then((data) => {
        setAlarms(data.content || []);
        setTotalPages(data.totalPages || 1);
      })
      .finally(() => setLoading(false));
  }, [page]);

  // 탭 필터링
  const filtered = activeTab.type
    ? alarms.filter((alarm) => alarm.type === activeTab.type)
    : alarms;

  if (loading) return <KotsuKotsuLoader />;

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-8 text-2xl font-bold">
        <FaBell className="text-yellow-500 w-7 h-7" />
        <span>알람 페이지</span>
      </div>
      {/* 탭 */}
      <div className="flex space-x-8 ml-4 pb-4">
        {ALARM_TABS.map((tab) => {
          const isActive = activeTab.label === tab.label;
          return (
            <div
              key={tab.label}
              onClick={() => {
                setActiveTab(tab);
                setPage(0); // 페이지도 초기화
              }}
              className={`relative group flex items-center gap-x-2 cursor-pointer transition-all duration-300 transform ${
                isActive
                  ? "text-black -translate-y-1"
                  : "text-gray-500 hover:text-black hover:-translate-y-1"
              }`}
            >
              {tab.icon}
              <span
                className={`text-md relative whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#003CFF] after:transition-all after:duration-300 ${
                  isActive
                    ? "after:left-0 after:w-full"
                    : "group-hover:after:left-0 group-hover:after:w-full after:w-0"
                }`}
              >
                {tab.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* 알림 리스트 */}
      <AlarmList alarms={filtered} />

      {/* 페이지네이션(옵션) */}
      <div className="flex gap-2 justify-center mt-5">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`px-3 py-1 rounded ${
              page === i ? "bg-blue-400 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
