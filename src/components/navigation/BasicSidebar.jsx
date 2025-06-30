import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import FriendListModal from "./../modals/FriendListModal";
import StudyRoomListModal from "../MyStudyRoom/StudyRoomListModal";

function BasicSidebar({ myStudyRooms = [], loading, refreshStudyRooms }) {
  const [friendModalOpen, setFriendModalOpen] = useState(false);
  const [studyRoomModalOpen, setStudyRoomModalOpen] = useState(false);

  return (
    <div className="h-full p-4 dark:bg-zinc-800 text-black dark:text-white transition-all duration-300">
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 p-4">
        <li className="flex flex-col items-center gap-3">
          <button
            onClick={() => setStudyRoomModalOpen(true)}
            className="flex flex-col items-center gap-3 cursor-pointer"
          >
            <div className="inline-flex items-center justify-center bg-white rounded-full p-2 text-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] hover:bg-gradient-to-bl from-blue-200 to-blue-400 hover:scale-120 transition-all duration-300">
              🏷️
            </div>
            <p className="text-sm font-bold">내 스터디방</p>
          </button>

          {studyRoomModalOpen && (
            <StudyRoomListModal
              studyRooms={myStudyRooms}
              loading={loading}
              onClose={() => setStudyRoomModalOpen(false)}
              onRefresh={refreshStudyRooms}
            />
          )}
        </li>
        <li className="flex flex-col items-center gap-3">
          <Link to="/note" className="flex flex-col items-center gap-3 ">
            <label className="cursor-pointer inline-flex items-center justify-center bg-white rounded-full p-2 text-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] hover:text-white hover:bg-gradient-to-bl from-blue-200 hover:scale-120 to-blue-400 transition-all duration-300">
              ✏️
            </label>
            <p className="text-sm font-bold">노트</p>
          </Link>
        </li>
        <li className="flex flex-col items-center gap-3">
          <Link
            to="/study/recruit"
            className="flex flex-col items-center gap-3"
          >
            <label className="cursor-pointer inline-flex items-center justify-center bg-white rounded-full p-2 text-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] hover:text-white hover:bg-gradient-to-bl from-blue-200 to-blue-400 hover:scale-120 transition-all duration-300">
              🙋
            </label>
            <p className="text-sm font-bold">스터디 구인</p>
          </Link>
        </li>
        <li className="flex flex-col items-center gap-3">
          <Link to="/chat" className="flex flex-col items-center gap-3">
            <label className="cursor-pointer inline-flex items-center justify-center bg-white rounded-full p-2 text-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] hover:text-white hover:bg-gradient-to-bl from-blue-200 to-blue-400 hover:scale-120 transition-all duration-300">
              💬
            </label>
            <p className="text-sm font-bold">채팅</p>
          </Link>
        </li>
        <li className="flex flex-col items-center gap-3">
          <Link to="/word" className="flex flex-col items-center gap-3">
            <label className="cursor-pointer inline-flex items-center justify-center bg-white rounded-full p-2 text-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] hover:text-white hover:bg-gradient-to-bl from-blue-200 to-blue-400 hover:scale-120 transition-all duration-300">
              📘
            </label>
            <p className="text-sm font-bold">단어장</p>
          </Link>
        </li>
        <li className="flex flex-col items-center gap-3">
          <Link to="/community" className="flex flex-col items-center gap-3">
            <label className="cursor-pointer inline-flex items-center justify-center bg-white rounded-full p-2 text-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] hover:text-white hover:bg-gradient-to-bl from-blue-200 to-blue-400 hover:scale-120 transition-all duration-300">
              👨‍👩‍👧‍👦
            </label>
            <p className="text-sm font-bold">자유 게시판</p>
          </Link>
        </li>
        <li className="flex flex-col items-center gap-3">
          {/* 친구 아이콘 → 버튼으로 */}
          <button
            type="button"
            className="flex flex-col items-center gap-3 focus:outline-none"
            onClick={() => setFriendModalOpen(true)}
          >
            <label className="cursor-pointer inline-flex items-center justify-center bg-white rounded-full p-3 text-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] hover:text-white hover:bg-gradient-to-bl from-blue-200 to-blue-400 hover:scale-120 transition-all duration-300">
              <FaUserFriends size={25} className="text-blue-400" />
            </label>
            <p className="text-sm font-bold">친구</p>
          </button>
        </li>
        {/* 친구 모달 */}
        <FriendListModal
          open={friendModalOpen}
          onClose={() => setFriendModalOpen(false)}
        />
        <li className="flex flex-col items-center gap-3">
          <Link to="/main/inquiry" className="flex flex-col items-center gap-3">
            <label className="cursor-pointer inline-flex items-center justify-center bg-white rounded-full p-2 text-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] hover:text-white hover:bg-gradient-to-bl from-blue-200 to-blue-400 hover:scale-120 transition-all duration-300">
              ❓
            </label>
            <p className="text-sm font-bold">문의</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default BasicSidebar;
