import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";
import NoteApi from "../../api/noteAPI";
import MDEditor from "@uiw/react-md-editor";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

export default function MyNoteForm({ mode = "create" }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // 수정 모드의 초기 데이터 로딩
  useEffect(() => {
    if (mode === "edit") {
      NoteApi.getNote(id)
        .then((data) => {
          setTitle(data.title);
          setImageUrl(data.imageUrl || "");
          setMarkdown(data.content);
        })
        .catch(() => setError("노트를 불러오는 데 실패했습니다."))
        .finally(() => setLoading(false));
    }
  }, [mode, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title,
      content: markdown,
      imageUrl:
        imageUrl ||
        "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg",
    };

    try {
      if (mode === "create") {
        await NoteApi.createNote(payload);
      } else {
        await NoteApi.updateNote(id, payload);
      }
      navigate("/note");
    } catch {
      setError("저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-4">로딩 중...</div>;

  return (
    <div className="w-full min-h-full flex flex-col items-center px-4 py-4">
      <div className="w-full max-w-5xl min-h-[80vh] bg-white rounded-2xl shadow-xl p-8">
        {/* 상단 바 */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-gray-700 flex items-center py-1 transition"
          >
            <HiArrowLeft className="w-6 h-6" />
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={saving || !title}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-semibold 
              border border-blue-500 text-blue-500 
              ${
                saving
                  ? "bg-gray-200 hover:bg-gray-200 text-gray-400"
                  : "bg-white hover:bg-blue-600 hover:text-white"
              } transition shadow-sm
            `}
          >
            {saving
              ? mode === "create"
                ? "저장 중..."
                : "수정 중..."
              : mode === "create"
              ? "저장"
              : "수정 저장"}
          </button>
        </div>

        {/* 제목 입력 */}
        <input
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full text-2xl font-bold border-b mb-4 p-2 focus:outline-none"
        />

        {/* 썸네일 URL 입력 */}
        <input
          placeholder="이미지 URL 입력 (기본값 : 핑구)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        {imageUrl && (
          <img
            src={imageUrl}
            alt="썸네일"
            className="w-full h-64 object-cover rounded mb-4"
          />
        )}

        {/* 마크다운 에디터 */}
        <MDEditor
          height={470}
          value={markdown}
          onChange={(v) => setMarkdown(v || "")}
        />

        {/* 프리뷰
        <div className="prose prose-lg max-w-none font-serif text-gray-800 dark:prose-invert whitespace-pre-wrap mt-8">
          <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
            {markdown}
          </ReactMarkdown>
        </div> */}

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
