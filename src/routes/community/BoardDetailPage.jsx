import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BoardApi from "../../api/boardAPI";
import { LuEye } from "react-icons/lu";
import { HiArrowLeft } from "react-icons/hi2";
import { useSelector } from "react-redux";
import ProfileModal from "../../components/common/ProfileModal";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

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
    <div className="w-full min-h-screen flex flex-col items-center px-4 py-4">
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
        {/* 본문 (마크다운, 반드시 div에 className="prose ...") */}
        <div className="prose prose-lg max-w-none font-serif text-gray-800 min-h-[200px] mb-8">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={{
              h1: (props) => (
                <h1 className="text-3xl font-bold my-4" {...props} />
              ),
              h2: (props) => (
                <h2 className="text-2xl font-semibold my-3" {...props} />
              ),
              ul: (props) => <ul className="list-disc ml-6 mb-2" {...props} />,
              li: (props) => <li className="mb-1" {...props} />,
              p: (props) => <p className="mb-2" {...props} />,
              a: (props) => (
                <a
                  {...props}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                />
              ),
              code: (props) => (
                <code
                  className="inline bg-zinc-200 text-pink-600 px-1 py-0.5 rounded font-mono text-base"
                  {...props}
                />
              ),
              pre: (props) => (
                <pre
                  className="bg-zinc-200 rounded p-5 my-5 font-mono text-base leading-relaxed overflow-x-auto"
                  {...props}
                />
              ),
            }}
          >
            {board.content}
          </ReactMarkdown>
        </div>
        {/* 프로필/닉네임/조회수 */}
        <div className="flex items-center gap-2 pt-4">
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
      {/* 프로필 모달 */}
      <ProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
        myId={userId}
      />
    </div>
  );
}
