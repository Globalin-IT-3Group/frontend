import StudyNoteItem from "./StudyNoteItem";
import StudyRoomApi from "../../api/studyRoomAPI";

export default function StudyNoteList({ notes, studyRoomId, loading }) {
  if (loading) return <p>로딩 중...</p>;
  if (!notes?.length)
    return (
      <div className="text-center text-gray-400 dark:text-white py-12">
        노트가 없습니다.
      </div>
    );

  return (
    <div className="flex flex-col gap-3">
      {notes.map((note) => (
        <StudyNoteItem key={note.id} note={note} studyRoomId={studyRoomId} />
      ))}
    </div>
  );
}
