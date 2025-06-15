import { useState } from "react";
import { useSelector } from "react-redux";
import { LuEye } from "react-icons/lu";
import ProfileModal from "../../components/common/ProfileModal";

export default function Board({ board, onClick }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const myId = useSelector((state) => state.auth.id);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });

  const shortContent =
    board.content.length > 10
      ? board.content.slice(0, 10) + "..."
      : board.content;

  const user = board.user;

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setProfileOpen(true);
  };

  return (
    <>
      <li
        className="shadow-md px-4 py-4 hover:bg-blue-50 transition cursor-pointer bg-white rounded-xl mb-5"
        onClick={onClick}
      >
        {/* 상단: 제목, 날짜 */}
        <div className="flex items-center mb-2">
          <span className="text-3xl font-bold truncate max-w-[70%]">
            {board.title}
          </span>
          <span className="text-xs text-gray-400 ml-4 whitespace-nowrap">
            {formatDate(board.createdAt)}
          </span>
        </div>
        {/* 중간: 본문 요약 */}
        <div className="text-xl text-gray-600 font-normal mb-3">
          {shortContent}
        </div>
        {/* 하단: 프로필, 닉네임, 조회수 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={
                user?.profileImage ||
                "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg"
              }
              alt="profile"
              className="w-7 h-7 rounded-full object-cover cursor-pointer"
              onClick={handleProfileClick}
            />
            <span
              className="text-sm text-gray-500 cursor-pointer hover:underline"
              onClick={handleProfileClick}
            >
              {user?.nickname || "알 수 없음"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 text-xs">
            <LuEye className="w-4 h-4" />
            <span>{board.viewCount}</span>
          </div>
        </div>
      </li>
      <ProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
        myId={myId}
      />
    </>
  );
}
