import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudyNoteApi from "../../api/studyNoteApi";
import StudyNoteList from "../../components/studyNote/StudyNoteList";

export default function StudyNote({ studyRoomId }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!studyRoomId) return;
    setLoading(true);
    StudyNoteApi.getNotesByRoom(studyRoomId)
      .then((data) => {
        console.log(data);
        setNotes(data.content ?? data);
      }) // content: Page, data: legacy
      .finally(() => setLoading(false));
  }, [studyRoomId]);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="flex flex-col gap-3">
      {/* 글쓰기 버튼 */}
      <div className="flex justify-end mb-4">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold border border-blue-600 bg-white text-blue-600 shadow-sm hover:bg-blue-600 hover:text-white hover:shadow transition cursor-pointer"
          onClick={() =>
            navigate(`/study/mystudyroom/${studyRoomId}/notes/new`)
          }
        >
          ✏️ 글쓰기
        </button>
      </div>
      {/* 노트 목록 컴포넌트 */}
      <StudyNoteList
        notes={notes}
        studyRoomId={studyRoomId}
        loading={loading}
      />
    </div>
  );
}
