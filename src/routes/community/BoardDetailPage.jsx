import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BoardApi from "../../api/boardAPI";
import { LuEye } from "react-icons/lu";
import { HiArrowLeft } from "react-icons/hi2";
import { useSelector } from "react-redux";
import ProfileModal from "../../components/common/ProfileModal";

export default function BoardDetailPage() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  const userId = useSelector((state) => state.auth.id);

  useEffect(() => {
    BoardApi.getBoardDetail(boardId)
      .then(setBoard)
      .finally(() => setLoading(false));
  }, [boardId]);

  if (loading) return <div className="text-center py-4">로딩중...</div>;
  if (!board)
    return <div className="text-center py-4">존재하지 않는 글입니다.</div>;

  const user = board.user;

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-50 py-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
        {/* 상단 바: 뒤로가기(왼쪽), 수정(오른쪽) */}
        <div className="flex items-center justify-between mb-6">
          {/* 왼쪽: 뒤로가기 */}
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-gray-700 py-1 rounded transition flex items-center"
          >
            <HiArrowLeft className="w-6 h-6" />
          </button>
          {/* 오른쪽: 수정 버튼 (본인 글일 때만) */}
          {userId === board.user?.id && (
            <button
              className="
                flex items-center gap-2
                px-4 py-2 rounded-lg font-semibold
                border border-blue-500 bg-white text-blue-500
                shadow-sm hover:bg-blue-600 hover:text-white hover:shadow
                transition
              "
              onClick={() => navigate(`/community/write?edit=${board.id}`)}
            >
              수정
            </button>
          )}
        </div>
        {/* 제목 */}
        <div className="text-3xl font-bold mb-1">{board.title}</div>
        {/* 날짜 */}
        <div className="text-sm text-gray-400 mb-3">
          {new Date(board.createdAt).toLocaleDateString("ko-KR")}
        </div>
        {/* 본문 */}
        <div className="text-xl text-gray-800 whitespace-pre-wrap min-h-[200px] mb-8">
          {board.content}
        </div>
        {/* 프로필/닉네임/조회수 */}
        <div className="flex items-center gap-2 mb-6">
          <img
            src={
              user?.profileImage ||
              "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg"
            }
            alt="profile"
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
            onClick={() => setProfileOpen(true)}
          />
          <span
            className="text-sm text-gray-800 cursor-pointer hover:underline"
            onClick={() => setProfileOpen(true)}
          >
            {user?.nickname || "알 수 없음"}
          </span>
          <div className="flex items-center gap-1 text-gray-500 text-xs ml-auto">
            <LuEye className="w-4 h-4" />
            <span>{board.viewCount}</span>
          </div>
        </div>
      </div>
      <ProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
        onAddFriend={() => alert("친구 추가 기능 준비중!")}
      />
    </div>
  );
}
