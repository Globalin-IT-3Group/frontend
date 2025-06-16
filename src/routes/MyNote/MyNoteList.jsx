import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import NoteApi from "../../api/noteAPI";

export default function MyNoteList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNotes() {
      try {
        const data = await NoteApi.getNotes();
        setNotes(data);
      } catch (err) {
        setError("노트 목록을 불러오는데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchNotes();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto">
      {/* 상단 글쓰기 버튼 추가 */}
      <div className="flex justify-end my-4">
        <button
          className="
            flex items-center gap-2
            px-4 py-2 rounded-lg font-semibold
            border border-blue-600 bg-white text-blue-600
            shadow-sm hover:bg-blue-600 hover:text-white hover:shadow
            transition
          "
          onClick={() => navigate("/note/new")}
        >
          <HiOutlinePencilSquare className="w-5 h-5" />
          {/* 글쓰기 텍스트는 md(768px) 이상에서만 보임 */}
          <span className="hidden md:inline">글쓰기</span>
        </button>
      </div>

      {/* 노트 목록 */}
      <ul className="divide-y divide-gray-200 dark:divide-zinc-600">
        {notes.map((note) => (
          <li
            key={note.id}
            className="flex items-center py-4 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
          >
            <img
              src={note.thumbnailUrl || "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg"}
              alt="썸네일"
              className="w-24 h-24 object-cover rounded-md flex-shrink-0"
            />
            <div className="ml-4 flex-1">
              <Link
                to={`/note/${note.id}`}
                className="text-lg font-medium text-gray-900 dark:text-white hover:underline"
              >
                {note.title}
              </Link>
              <p className="text-gray-500 dark:text-gray-300 text-sm truncate w-full">
                {note.content}
              </p>
            </div>
            <span className="text-sm text-gray-400 dark:text-gray-500">
              {note.date}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
