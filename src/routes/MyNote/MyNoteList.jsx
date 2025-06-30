import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // ← 추가
import { HiOutlinePencilSquare } from "react-icons/hi2";
import NoteApi from "../../api/noteAPI";
import MyNoteListSkeleton from "../../components/skeleton/MyNote/MyNoteListSkeleton";

export default function MyNoteList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fakeLoading, setFakeLoading] = useState(true);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // ← 로그인 여부 확인

  useEffect(() => {
    const timer = setTimeout(() => {
      setFakeLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    async function fetchNotes() {
      if (!isLoggedIn) {
        setLoading(false); // 로딩 false로 설정 (안 해주면 계속 "로딩 중..."이 뜸)
        return;
      }
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
  }, [isLoggedIn]); // ← 의존성으로 isLoggedIn 추가

  if (loading) return <p>로딩 중...</p>;
  if (!isLoggedIn)
    return (
      <p className="text-center mt-10">로그인 후 노트를 확인할 수 있습니다.</p>
    );
  if (error) return <p>{error}</p>;

  const getEllipsisMessage = (msg) => {
    if (!msg) return "";
    return msg.length > 15 ? msg.slice(0, 15) + "..." : msg;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* 상단 글쓰기 버튼 */}
      <div className="flex justify-end my-4">
        <button
          className="
            flex items-center gap-2
            px-4 py-2 rounded-lg font-semibold
            border border-blue-600 bg-white text-blue-600
            shadow-sm hover:bg-blue-600 hover:text-white hover:shadow
            transition cursor-pointer
          "
          onClick={() => navigate("/note/new")}
        >
          <HiOutlinePencilSquare className="w-5 h-5" />
          <span className="hidden md:inline">글쓰기</span>
        </button>
      </div>

      {/* 노트 목록 */}
      {fakeLoading ? (
        <MyNoteListSkeleton />
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-zinc-600">
          {notes.map((note) => (
            <li
              key={note.id}
              className="flex items-center py-4 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
            >
              <img
                src={
                  note.imageUrl ||
                  "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg"
                }
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
                  {getEllipsisMessage(note.content)}
                </p>
              </div>
              <span className="text-sm text-gray-400 dark:text-white">
                {note.createdAt
                  ? new Date(note.createdAt).toLocaleString()
                  : "날짜 없음"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
