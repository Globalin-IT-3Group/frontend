import { useState } from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaRegTrashCan } from "react-icons/fa6";
import CommentApi from "../../api/commentAPI";
import ProfileModal from "../../components/common/ProfileModal";

export default function Comment({ comment, myId, onReload }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(comment.content);
  const [profileOpen, setProfileOpen] = useState(false);

  const isEdited = comment.updatedAt && comment.updatedAt !== comment.createdAt;

  // 수정 완료
  const handleUpdate = async () => {
    await CommentApi.updateComment({
      commentId: comment.id,
      userId: myId,
      content: value,
    });
    setEditing(false);
    onReload?.();
  };

  // 수정 시작시 value 초기화
  const handleEditClick = () => {
    setValue(comment.content);
    setEditing(true);
  };

  // 삭제
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제할까요?")) return;
    await CommentApi.deleteComment({
      commentId: comment.id,
      userId: myId,
    });
    onReload?.();
  };

  return (
    <>
      <li className="bg-zinc-100 dark:bg-zinc-500 p-3 rounded text-black dark:text-white">
        <div className="flex items-center gap-2 mb-1">
          {/* 프로필 이미지 클릭 시 모달 */}
          <img
            src={
              comment.user.profileImage ||
              "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg"
            }
            alt="profile"
            className="w-6 h-6 rounded-full object-cover cursor-pointer"
            onClick={() => setProfileOpen(true)}
          />
          <span
            className="font-semibold cursor-pointer hover:underline"
            onClick={() => setProfileOpen(true)}
          >
            {comment.user.nickname}
          </span>
          {/* 날짜/수정됨 */}
          <span className="text-xs text-gray-400 dark:text-zinc-200 ml-2">
            {isEdited
              ? `(수정됨 ${new Date(comment.updatedAt).toLocaleString()})`
              : new Date(comment.createdAt).toLocaleString()}
          </span>
          {/* 수정/삭제 버튼 (본인 댓글일 때만) */}
          {myId === comment.user.id && (
            <div className="ml-auto flex gap-1">
              {editing ? (
                <>
                  <button className="text-blue-500" onClick={handleUpdate}>
                    저장
                  </button>
                  <button
                    className="text-gray-400"
                    onClick={() => setEditing(false)}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  {/* 수정 버튼 */}
                  <button
                    className="
                      ml-auto flex items-center gap-2
                      px-2 py-1 rounded-lg font-semibold
                      border border-blue-600 bg-white text-blue-600
                      shadow-sm hover:bg-blue-600 hover:text-white hover:shadow
                      transition
                    "
                    onClick={handleEditClick}
                  >
                    <HiOutlinePencilSquare className="w-3 h-3" />
                  </button>
                  {/* 삭제 버튼 */}
                  <button
                    className="
                      ml-auto flex items-center gap-2
                      px-2 py-2 rounded-lg font-semibold
                      border border-red-500 bg-white text-red-500
                      shadow-sm hover:bg-red-500 hover:text-white hover:shadow
                      transition
                    "
                    onClick={handleDelete}
                    title="댓글 삭제"
                  >
                    <FaRegTrashCan className="w-3 h-3" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        {editing ? (
          <input
            className="w-full mt-2 p-1 border rounded"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <div>{comment.content}</div>
        )}
      </li>
      {/* 프로필 모달 */}
      <ProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={comment.user}
        myId={myId}
      />
    </>
  );
}
