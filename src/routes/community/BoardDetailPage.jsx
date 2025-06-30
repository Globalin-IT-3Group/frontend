import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BoardApi from "../../api/boardAPI";
import { LuEye } from "react-icons/lu";
import { HiArrowLeft, HiOutlinePencilSquare } from "react-icons/hi2";
import { useSelector } from "react-redux";
import ProfileModal from "../../components/common/ProfileModal";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import CommentInput from "../../components/community/CommentInput";
import CommentList from "../../components/community/CommentList";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

export default function BoardDetailPage() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  // 댓글 새로고침용 state
  const [commentReload, setCommentReload] = useState(0);

  const userId = useSelector((state) => state.auth.id);

  const deleteConfirm = async () => {
    const result = await Swal.fire({
      title: "게시글을 삭제하시겠습니까?",
      text: "삭제된 글은 복구할 수 없습니다.",
      imageUrl: "/question.svg",
      imageWidth: 120,
      imageHeight: 120,
      showCancelButton: true,
      confirmButtonColor: "#0033CF",
      cancelButtonColor: "#D9D9D9",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    });

    if (result.isConfirmed) {
      try {
        await BoardApi.deleteBoard(board.id);
        Swal.fire({
          title: "삭제 완료!",
          text: "글이 정상적으로 삭제되었습니다.",
          imageUrl: "/success.svg",
          imageWidth: 120,
          imageHeight: 120,
          showCancelButton: false,
          confirmButtonColor: "#0033CF",
          confirmButtonText: "닫기",
        });
        navigate("/community");
      } catch (err) {
        console.error(err);
        Swal.fire({
          title: "삭제 실패",
          text: "삭제에 실패했습니다. 다시 시도해주세요.",
          imageUrl: "/error.svg",
          imageWidth: 120,
          imageHeight: 120,
          confirmButtonColor: "#d33",
          confirmButtonText: "닫기",
        });
      }
    }
  };

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
      <div className="w-full max-w-3xl bg-white dark:bg-zinc-600 rounded-2xl shadow-xl p-8">
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
            <div className="flex gap-3">
              <button
                className="
                flex items-center gap-2
                px-4 py-2 rounded-lg font-semibold
                border border-blue-500 bg-white text-blue-500
                shadow-sm hover:bg-blue-600 hover:text-white hover:shadow
                transition cursor-pointer
              "
                onClick={() => navigate(`/community/write?edit=${board.id}`)}
              >
                <HiOutlinePencilSquare className="w-5 h-6" /> 수정
              </button>
              <button
                className="
                flex items-center gap-2
                px-4 py-2 rounded-lg font-semibold
                border border-blue-500 bg-white text-blue-500
                shadow-sm hover:bg-blue-600 hover:text-white hover:shadow
                transition cursor-pointer
              "
                onClick={() => deleteConfirm()}
              >
                <FaRegTrashCan className="w-4 h-6" /> 삭제
              </button>
            </div>
          )}
        </div>
        {/* 제목 */}
        <div className="text-3xl font-bold mb-1 dark:text-white">
          {board.title}
        </div>
        {/* 날짜 */}
        <div className="text-sm text-gray-400 dark:text-gray-300 mb-3">
          {new Date(board.createdAt).toLocaleDateString("ko-KR")}
        </div>
        {/* 본문 (마크다운, 반드시 div에 className="prose ...") */}
        <div className="prose prose-lg max-w-none text-gray-800 dark:text-white min-h-[200px] mb-8">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={{
              p: (props) => <p className="mb-2 dark:text-white" {...props} />,
              a: (props) => (
                <a
                  {...props}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 underline"
                />
              ),
              code: (props) => (
                <code
                  className="inline bg-zinc-200 dark:bg-zinc-700 text-pink-600 px-1 py-0.5 rounded font-mono text-base"
                  {...props}
                />
              ),
              pre: (props) => (
                <pre
                  className="bg-zinc-200 dark:bg-zinc-700 rounded p-5 my-5 font-mono text-base leading-relaxed overflow-x-auto"
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
            src={user?.profileImage || "..."}
            alt="profile"
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
            onClick={() => setProfileOpen(true)}
          />
          <span
            className="text-sm text-gray-800 dark:text-white cursor-pointer hover:underline"
            onClick={() => setProfileOpen(true)}
          >
            {user?.nickname || "알 수 없음"}
          </span>
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-300 text-xs ml-auto">
            <LuEye className="w-4 h-4" />
            <span>{board.viewCount}</span>
          </div>
        </div>
        {/* ===== 댓글 영역 ===== */}
        <div className="border-t mt-8 pt-6 border-gray-300 dark:border-zinc-200">
          <div className="font-bold text-lg mb-2 text-gray-400 dark:text-gray-300">
            댓글
          </div>
          <CommentInput
            boardId={board.id}
            userId={userId}
            onCommentPosted={() => setCommentReload((c) => c + 1)}
          />
          <CommentList
            boardId={board.id}
            userId={userId}
            reloadKey={commentReload}
            onReload={() => setCommentReload((c) => c + 1)}
          />
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
