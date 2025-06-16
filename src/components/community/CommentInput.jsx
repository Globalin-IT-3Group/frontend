import { useState } from "react";
import CommentApi from "../../api/commentAPI";

export default function CommentInput({ boardId, userId, onCommentPosted }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    setLoading(true);
    await CommentApi.createComment({ userId, boardId, content: value });
    setValue("");
    setLoading(false);
    onCommentPosted?.(); // 부모에서 새로고침 트리거
  };

  return (
    <form className="flex gap-2 mb-4" onSubmit={handleSubmit}>
      <input
        className="flex-1 border px-2 py-1 rounded"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="댓글을 입력하세요"
        disabled={loading}
      />
      <button
        className="px-4 py-1 rounded bg-blue-500 text-white font-semibold disabled:opacity-50"
        disabled={loading}
        type="submit"
      >
        등록
      </button>
    </form>
  );
}
