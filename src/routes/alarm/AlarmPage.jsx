import { useEffect, useState } from "react";
import NotificationApi from "../../api/notificationAPI";
import AlarmList from "../../components/alarms/AlarmList";
import KotsuKotsuLoader from "../../components/loadings/KotsuKotsuLoader";
import { BsMailbox2Flag } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { GrUserManager } from "react-icons/gr";
import { FaBell } from "react-icons/fa";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import AlarmSkeleton from "../../components/skeleton/alarms/AlarmSkeleton";

const ALARM_TABS = [
  { label: "전체", type: null, icon: <BsMailbox2Flag /> },
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
  const [fakeLoading, setFakeLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFakeLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  });

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

  const handleRead = async (notificationId) => {
    await NotificationApi.markAsRead(notificationId);
    setAlarms((prev) =>
      prev.map((a) => (a.id === notificationId ? { ...a, read: true } : a))
    );
  };

  // 알림 삭제 핸들러
  const handleDeleteAlarm = (notificationId) => {
    setAlarms((prev) => prev.filter((a) => a.id !== notificationId));
  };

  if (loading) return <KotsuKotsuLoader />;

  return (
    <div className="mt-8 px-6 py-4 max-w-4xl mx-auto bg-white dark:bg-zinc-600 rounded-2xl shadow-xl">
      <div className="flex items-center gap-2 mb-12 text-3xl font-bold justify-center">
        <FaBell className="text-yellow-500 w-8 h-8 shrink-0" />
        <span className="dark:text-white truncate whitespace-nowrap overflow-hidden max-w-full">
          알람 페이지
        </span>
      </div>
      {/* 탭 */}
      <div className="flex overflow-x-auto scrollbar-none space-x-4 sm:space-x-6 px-2 pb-4 -mx-2">
        {ALARM_TABS.map((tab) => {
          const isActive = activeTab.label === tab.label;
          return (
            <div
              key={tab.label}
              onClick={() => {
                setActiveTab(tab);
                setPage(0);
              }}
              className={`relative group flex items-center gap-x-1 sm:gap-x-2 px-1 sm:px-2 py-1 cursor-pointer transition-all duration-300 transform
          ${
            isActive
              ? "text-black -translate-y-0.5 dark:text-white"
              : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:-translate-y-0.5"
          }`}
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5">{tab.icon}</div>
              <span
                className={`text-sm sm:text-lg relative whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#003CFF] after:transition-all after:duration-300 ${
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
      {fakeLoading ? (
        <AlarmSkeleton />
      ) : (
        <AlarmList
          alarms={filtered}
          onRead={handleRead}
          onDeleteAlarm={handleDeleteAlarm}
        />
      )}

      {/* 페이지네이션(옵션) */}
      <div className="flex justify-center gap-2 mt-8 mb-6">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className={`w-10 h-10 flex items-center justify-center rounded-full
              ${
                page === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
              }`}
          aria-label="이전"
        >
          <MdChevronLeft size={24} />
        </button>

        <span className="flex items-center px-4 font-semibold dark:text-white">
          {page + 1}/{totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page + 1 >= totalPages}
          className={`w-10 h-10 flex items-center justify-center rounded-full
            ${
              page + 1 >= totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
            }`}
          aria-label="다음"
        >
          <MdChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
