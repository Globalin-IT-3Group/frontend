import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import FriendListModal from "./../modals/FriendListModal";
import StudyRoomListModal from "../MyStudyRoom/StudyRoomListModal";

export default function MobileSidebar({
  open,
  onClose,
  myStudyRooms = [],
  loading,
  refreshStudyRooms,
}) {
  const [friendModalOpen, setFriendModalOpen] = useState(false);
  const [studyRoomModalOpen, setStudyRoomModalOpen] = useState(false);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden"
      onClick={onClose}
    >
      <div
        className="absolute top-0 left-0 w-full bg-white dark:bg-zinc-800 shadow-lg p-4 pt-6 rounded-b-xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="grid grid-cols-3 gap-x-4 gap-y-8 px-4 text-center text-sm font-bold transition-all duration-300 text-black dark:text-white">
          <SidebarItem
            icon="🏷️"
            label="내 스터디방"
            onClick={() => setStudyRoomModalOpen(true)}
          />
          <SidebarLink to="/note" icon="✏️" label="노트" />
          <SidebarLink to="/study/recruit" icon="🙋" label="스터디 구인" />
          <SidebarLink to="/chat" icon="💬" label="채팅" />
          <SidebarLink to="/word" icon="📘" label="단어장" />
          <SidebarLink to="/community" icon="👨‍👩‍👧‍👦" label="자유 게시판" />
          <SidebarItem
            icon={<FaUserFriends size={25} className="text-blue-400" />}
            label="친구"
            onClick={() => setFriendModalOpen(true)}
          />
          <SidebarLink to="/main/inquiry" icon="❓" label="문의" />
        </ul>

        {/* 모달들 */}
        {studyRoomModalOpen && (
          <StudyRoomListModal
            studyRooms={myStudyRooms}
            loading={loading}
            onClose={() => setStudyRoomModalOpen(false)}
            onRefresh={refreshStudyRooms}
          />
        )}
        <FriendListModal
          open={friendModalOpen}
          onClose={() => setFriendModalOpen(false)}
        />
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, onClick }) {
  return (
    <li className="flex flex-col items-center gap-2">
      <button onClick={onClick} className="flex flex-col items-center gap-2">
        <div className="inline-flex items-center justify-center bg-white rounded-full p-2 text-2xl shadow-2xs hover:bg-gradient-to-bl from-blue-200 to-blue-400 hover:scale-110 transition-all duration-300">
          {icon}
        </div>
        <p>{label}</p>
      </button>
    </li>
  );
}

function SidebarLink({ to, icon, label }) {
  return (
    <li className="flex flex-col items-center gap-2">
      <Link to={to} className="flex flex-col items-center gap-2">
        <label className="inline-flex items-center justify-center bg-white rounded-full p-2 text-2xl shadow-2xs hover:bg-gradient-to-bl from-blue-200 to-blue-400 hover:scale-110 transition-all duration-300">
          {icon}
        </label>
        <p>{label}</p>
      </Link>
    </li>
  );
}
