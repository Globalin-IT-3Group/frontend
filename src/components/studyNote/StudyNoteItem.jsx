import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { useSelector } from "react-redux";
import ProfileModal from "../../components/common/ProfileModal";

export default function StudyNoteItem({ note, studyRoomId }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const myId = useSelector((state) => state.auth.id);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setProfileOpen(true);
  };

  const shortContent =
    note.content && note.content.length > 10
      ? note.content.slice(0, 10) + "..."
      : note.content;

  const nickname = note.writerNickname || note.user?.nickname || "알 수 없음";
  const profileImage =
    note.user?.profileImage ||
    "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg";
  const thumbnail =
    note.thumbnail ||
    "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg";

  return (
    <>
      <li
        className="shadow-md px-4 py-4 hover:bg-blue-50 transition cursor-pointer bg-white mb-5 flex flex-col"
        onClick={() =>
          window.location.assign(
            `/study/mystudyroom/${studyRoomId}/notes/${note.id}`
          )
        }
      >
        <div className="flex justify-between gap-4 items-center">
          {/* 제목/날짜 */}
          <div className="flex items-start gap-4 w-full">
            {/* 썸네일 */}
            <img
              src={thumbnail}
              alt="노트 썸네일"
              className="w-20 h-20 object-cover shadow"
            />
            <div className="flex-1 flex flex-col justify-start">
              <div className="flex items-start justify-between">
                {/* 제목+미리보기 */}
                <div>
                  <span className="text-2xl font-bold truncate block max-w-[380px]">
                    {note.title}
                  </span>
                  <div className="text-lg text-gray-600 font-normal">
                    {shortContent}
                  </div>
                </div>
                {/* 날짜 */}
                <span className="text-xs text-gray-400 ml-4 whitespace-nowrap mt-1">
                  {formatDate(note.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* 하단: 프로필/닉네임 + 좋아요/댓글 */}
        <div className="flex items-center justify-between mt-3 pt-2">
          {/* 프로필/닉네임 */}
          <div className="flex items-center gap-2">
            <img
              src={profileImage}
              alt="profile"
              className="w-7 h-7 rounded-full object-cover cursor-pointer"
              onClick={handleProfileClick}
            />
            <span
              className="text-sm text-gray-500 cursor-pointer hover:underline"
              onClick={handleProfileClick}
            >
              {nickname}
            </span>
          </div>
          {/* 좋아요/댓글수 */}
          <div className="flex items-center gap-3 text-gray-500 text-xs">
            <span className="flex items-center gap-1">
              <FaRegHeart className="w-4 h-4" />
              {note.heartCount ?? 0}
            </span>
            <span className="flex items-center gap-1">
              <FaRegCommentDots className="w-4 h-4" />
              {note.commentCount ?? 0}
            </span>
          </div>
        </div>
      </li>
      <ProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={{
          nickname,
          profileImage,
          ...note.user,
        }}
        myId={myId}
      />
    </>
  );
}
