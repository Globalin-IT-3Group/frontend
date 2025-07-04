import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";
import NoteApi from "../../api/noteAPI";
import MDEditor from "@uiw/react-md-editor";
import Swal from "sweetalert2";

export default function MyNoteForm({ mode = "create" }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const handleBack = () => navigate(-1);

  const editConfirm = async () => {
    const result = await Swal.fire({
      title: "글을 수정하시겠습니까?",
      text: "취소시 수정중인 글로 돌아갑니다.",
      imageUrl: "/question.svg",
      imageWidth: 120,
      imageHeight: 120,
      showCancelButton: true,
      confirmButtonColor: "#003CFF",
      cancelButtonColor: "#D9D9D9",
      confirmButtonText: "수정",
      cancelButtonText: "취소",
    });
    return result.isConfirmed;
  };

  const registerConfirm = async () => {
    const result = await Swal.fire({
      title: "글을 등록하시겠습니까?",
      text: "취소시 작성중인 글로 돌아갑니다.",
      imageUrl: "/question.svg",
      imageWidth: 120,
      imageHeight: 120,
      showCancelButton: true,
      confirmButtonColor: "#003CFF",
      cancelButtonColor: "#D9D9D9",
      confirmButtonText: "등록",
      cancelButtonText: "취소",
    });
    return result.isConfirmed;
  };

  const editSuccess = async () => {
    await Swal.fire({
      title: "글 수정 완료!",
      text: "글이 정상적으로 수정되었습니다.",
      imageUrl: "/success.svg",
      imageWidth: 120,
      imageHeight: 120,
      confirmButtonColor: "#003CFF",
      confirmButtonText: "닫기",
    });
  };

  const registerSuccess = async () => {
    await Swal.fire({
      title: "글 등록 완료!",
      text: "글이 정상적으로 등록되었습니다.",
      imageUrl: "/success.svg",
      imageWidth: 120,
      imageHeight: 120,
      confirmButtonColor: "#003CFF",
      confirmButtonText: "닫기",
    });
  };

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

    if (!title.trim() || !markdown.trim()) {
      alert("제목과 내용을 모두 입력하세요.");
      return;
    }
    setSaving(true);
    setError("");

    const payload = {
      title,
      content: markdown,
      imageUrl: imageUrl,
    };

    try {
      if (mode === "edit") {
        const confirmed = await editConfirm();
        if (!confirmed) {
          setSaving(false);
          return;
        }

        await NoteApi.updateNote(id, payload);
        await editSuccess();
      } else {
        const confirmed = await registerConfirm();
        if (!confirmed) {
          setSaving(false);
          return;
        }
        await NoteApi.createNote(payload);
        await registerSuccess();
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
      <div className="w-full max-w-5xl min-h-[80vh] bg-white dark:bg-zinc-700 rounded-2xl shadow-xl p-8">
        {/* 상단 바 */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-gray-700 flex items-center py-1 transition cursor-pointer"
          >
            <HiArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mx-auto">
            {mode === "edit" ? "내 노트 수정" : "내 노트 작성"}
          </h1>
        </div>

        {/* 제목 입력 */}
        <input
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full text-2xl font-bold border-b dark:text-white dark:placeholder:text-white mb-4 p-2 focus:outline-none"
        />

        {/* 썸네일 URL 입력 */}
        <input
          placeholder="이미지 URL 입력 (기본값 : 핑구)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full border p-2 rounded mb-4 dark:text-white dark:placeholder:text-white"
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

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <div className="flex px-8 mt-4 mb-8 gap-4 relative">
          <div className="flex gap-4 absolute right-0">
            <button
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-xl shadow hover:bg-gray-400 transition cursor-pointer"
              onClick={handleBack}
              disabled={loading}
            >
              뒤로
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#003CFF] text-white px-6 py-2 rounded-xl shadow hover:bg-blue-500 transition cursor-pointer"
              disabled={loading}
            >
              {mode === "edit" ? "수정" : "게시"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
