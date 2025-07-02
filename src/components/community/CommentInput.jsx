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
    <form className="flex gap-2 mb-4 w-full" onSubmit={handleSubmit}>
      <input
        className="
      flex-1 border border-gray-300 dark:border-zinc-400
      px-3 py-2 rounded 
      bg-transparent
      text-black dark:text-white 
      placeholder:text-gray-400 dark:placeholder:text-zinc-400 
      focus:outline-none focus:ring-2 focus:ring-blue-500
      min-w-0
    "
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="댓글을 입력하세요"
        disabled={loading}
      />
      <button
        className="
      px-4 py-1 rounded bg-blue-500 text-white font-semibold
      disabled:opacity-50
      shrink-0
    "
        disabled={loading}
        type="submit"
      >
        등록
      </button>
    </form>
  );
}
