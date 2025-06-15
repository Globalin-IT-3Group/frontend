import Board from "./Board";

export default function BoardList({ boards, onItemClick }) {
  if (!boards || boards.length === 0) {
    return (
      <div className="text-gray-400 text-center py-20">게시글이 없습니다.</div>
    );
  }
  return (
    <ul>
      {boards.map((board) => (
        <Board
          key={board.id}
          board={board}
          onClick={() => onItemClick && onItemClick(board)}
        />
      ))}
    </ul>
  );
}
