import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import StudyNoteApi from "../../api/studyNoteAPI";

export default function StudyNoteForm() {
  const navigate = useNavigate();
  const { studyRoomId, noteId } = useParams();
  const isEdit = Boolean(noteId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(""); // 썸네일 url 추가
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      StudyNoteApi.getNoteDetail(noteId)
        .then((data) => {
          setTitle(data.title);
          setContent(data.content);
          setThumbnail(data.thumbnail || "");
        })
        .finally(() => setLoading(false));
    }
  }, [isEdit, noteId]);

  const DEFAULT_THUMBNAIL =
    "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg";

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력하세요.");
      return;
    }
    setLoading(true);
    try {
      const noteData = {
        studyRoomId,
        title,
        content,
        thumbnail: thumbnail?.trim() || DEFAULT_THUMBNAIL, // ★ 여기!
      };

      if (isEdit) {
        await StudyNoteApi.updateNote(noteId, noteData);
        alert("수정 완료!");
      } else {
        await StudyNoteApi.createNote(noteData);
        alert("등록 완료!");
      }
      navigate(`/study/mystudyroom/${studyRoomId}`);
    } catch {
      alert("저장 실패!");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => navigate(-1);

  return (
    <div className="w-full h-full flex flex-col items-center py-2">
      <div className="w-full max-w-6xl bg-white dark:bg-zinc-700 rounded-2xl flex flex-col gap-8 p-0">
        {/* 작성/수정 타이틀 */}
        <div className="w-full flex justify-center items-center py-8 border-b border-gray-500">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            {isEdit ? "노트 수정" : "노트 작성"}
          </h1>
        </div>
        <div className="flex w-full h-[560px] px-8 gap-6">
          {/* 왼쪽: 제목 + 에디터 + 썸네일 입력 */}
          <div className="w-1/2 h-full flex flex-col">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              className="w-full text-2xl font-bold border-none outline-none bg-transparent my-3 dark:text-white dark:placeholder-white placeholder-gray-400"
              disabled={loading}
            />
            <input
              type="text"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="썸네일 이미지 URL (옵션)"
              className="w-full border dark:border-white rounded-lg px-3 py-2 mb-3 dark:text-white placeholder-gray-400 dark:placeholder-white"
              disabled={loading}
            />
            <div className="flex-1 flex flex-col">
              <MDEditor
                value={content}
                onChange={setContent}
                height={450}
                preview="edit"
                extraCommands={[]}
                textareaProps={{
                  placeholder: "여기에 내용을 작성하세요...",
                  className: "bg-transparent min-h-[400px] text-base",
                }}
                disabled={loading}
              />
            </div>
          </div>
          {/* 오른쪽: 마크다운 프리뷰 */}
          <div className="w-1/2 h-full shadow-xl overflow-y-auto bg-gray-100 p-6">
            {thumbnail && (
              <img
                src={thumbnail}
                alt="노트 썸네일 미리보기"
                className="mb-4 max-h-32 rounded shadow"
                style={{ objectFit: "cover" }}
              />
            )}
            {title && (
              <div className="text-3xl font-bold mb-4 break-words">{title}</div>
            )}
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              components={{
                h1: (props) => (
                  <h1 className="text-3xl font-bold my-4" {...props} />
                ),
                h2: (props) => (
                  <h2 className="text-2xl font-semibold my-3" {...props} />
                ),
                ul: (props) => (
                  <ul className="list-disc ml-6 mb-2" {...props} />
                ),
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
              {content}
            </ReactMarkdown>
          </div>
        </div>
        {/* 버튼 영역 */}
        <div className="flex justify-end px-8 mb-8 gap-4">
          <button
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-xl shadow hover:bg-gray-400 transition"
            onClick={handleBack}
            disabled={loading}
          >
            뒤로
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition"
            disabled={loading}
          >
            {isEdit ? "수정" : "게시"}
          </button>
        </div>
      </div>
    </div>
  );
}
