import { useEffect, useState } from "react";
import CommentApi from "../../api/commentAPI";
import Comment from "./Comment"; // 새로 분리한 컴포넌트

export default function CommentList({ boardId, userId, reloadKey, onReload }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    CommentApi.getCommentsByBoardId(boardId)
      .then(setComments)
      .finally(() => setLoading(false));
  }, [boardId, reloadKey]);

  if (loading) return <div>댓글 불러오는 중...</div>;
  if (comments.length === 0)
    return (
      <div className="text-gray-400 text-sm py-5">아직 댓글이 없습니다.</div>
    );

  return (
    <ul className="mt-4 space-y-4">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          myId={userId}
          onReload={onReload}
        />
      ))}
    </ul>
  );
}
