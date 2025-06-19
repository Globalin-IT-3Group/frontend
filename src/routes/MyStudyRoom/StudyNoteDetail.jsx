import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import StudyNoteApi from "../../api/studyNoteApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { HiArrowLeft, HiOutlinePencilSquare } from "react-icons/hi2";
import { useSelector } from "react-redux";
import ProfileModal from "../../components/common/ProfileModal";
import CommentInput from "../../components/community/CommentInput";
import CommentList from "../../components/community/CommentList";

export default function StudyNoteDetail() {
  const { studyRoomId, noteId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [commentReload, setCommentReload] = useState(0);

  const userId = useSelector((state) => state.auth.id);

  useEffect(() => {
    setLoading(true);
    StudyNoteApi.getNoteDetail(noteId)
      .then(setNote)
      .finally(() => setLoading(false));
  }, [noteId]);

  if (loading) return <div className="text-center py-4">로딩중...</div>;
  if (!note)
    return <div className="text-center py-4">존재하지 않는 노트입니다.</div>;

  const nickname = note.writerNickname || note.user?.nickname || "알 수 없음";
  const profileImage =
    note.writerProfileImage ||
    note.user?.profileImage ||
    "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg";
  const thumbnail =
    note.thumbnail ||
    "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg";

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4 py-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
        {/* 상단 바: 뒤로가기/수정 */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-gray-700 py-1 rounded transition flex items-center"
          >
            <HiArrowLeft className="w-6 h-6" />
          </button>
          {userId === note.user?.id && (
            <button
              className="
                flex items-center gap-2
                px-4 py-2 rounded-lg font-semibold
                border border-blue-500 bg-white text-blue-500
                shadow-sm hover:bg-blue-600 hover:text-white hover:shadow
                transition
              "
              onClick={() =>
                navigate(
                  `/study/mystudyroom/${studyRoomId}/notes/${note.id}/edit`
                )
              }
            >
              <HiOutlinePencilSquare className="w-4 h-6" />
            </button>
          )}
        </div>
        {/* 썸네일 */}
        <img
          src={thumbnail}
          alt="썸네일"
          className="w-full max-h-60 object-cover mb-4 rounded-xl shadow"
        />
        {/* 제목 */}
        <div className="text-3xl font-bold mb-1">{note.title}</div>
        {/* 날짜 */}
        <div className="text-sm text-gray-400 mb-3">
          {new Date(note.createdAt).toLocaleDateString("ko-KR")}
        </div>
        {/* 본문 (마크다운) */}
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
            {note.content}
          </ReactMarkdown>
        </div>
        {/* 프로필/닉네임 */}
        <div className="flex items-center gap-2 pt-4">
          <img
            src={profileImage}
            alt="profile"
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
            onClick={() => setProfileOpen(true)}
          />
          <span
            className="text-sm text-gray-800 cursor-pointer hover:underline"
            onClick={() => setProfileOpen(true)}
          >
            {nickname}
          </span>
        </div>
        {/* ===== 댓글 영역 ===== */}
        <div className="border-t pt-7 mt-8">
          <div className="font-bold text-lg mb-2 text-gray-400">댓글</div>
          <CommentInput
            boardId={note.id}
            userId={userId}
            onCommentPosted={() => setCommentReload((c) => c + 1)}
          />
          <CommentList
            boardId={note.id}
            userId={userId}
            reloadKey={commentReload}
            onReload={() => setCommentReload((c) => c + 1)}
          />
        </div>
      </div>
      <ProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={{ nickname, profileImage, ...note.user }}
        myId={userId}
      />
    </div>
  );
}
