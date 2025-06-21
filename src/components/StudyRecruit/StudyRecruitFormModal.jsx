import { useState } from "react";
import { MdClose } from "react-icons/md";
import StudyRecruitApi from "../../api/studyRecruitAPI";

export default function StudyRequestFormModal({
  open,
  onClose,
  studyRoomId,
  onSuccess,
}) {
  const [form, setForm] = useState({
    title: "",
    studyExplain: "",
    isOpen: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) return setError("제목을 입력하세요.");
    if (!form.studyExplain.trim()) return setError("스터디 설명을 입력하세요.");

    setLoading(true);
    try {
      await StudyRecruitApi.createRecruit({
        studyRoomId, // 스터디방 id로 등록 (필요하다면)
        title: form.title,
        studyExplain: form.studyExplain,
        isOpen: form.isOpen,
      });
      onSuccess?.();
      setForm({ title: "", studyExplain: "", isOpen: true });
      onClose?.();
    } catch {
      setError("구인 등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1.5px]">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white dark:bg-zinc-800 rounded-3xl shadow-2xl px-8 py-10 w-full max-w-xl flex flex-col gap-6 border border-zinc-200 dark:border-zinc-700"
      >
        <button
          type="button"
          className="absolute right-7 top-6 text-3xl text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition cursor-pointer"
          onClick={onClose}
          aria-label="닫기"
        >
          <MdClose size={24} />
        </button>

        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-2 tracking-tight">
          스터디 구인 작성
        </h2>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-zinc-700 dark:text-zinc-200">
            제목 <span className="text-red-500">*</span>
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium transition placeholder:text-zinc-400"
            placeholder="제목을 입력하세요"
            required
            maxLength={50}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-zinc-700 dark:text-zinc-200">
            설명 <span className="text-red-500">*</span>
          </label>
          <textarea
            name="studyExplain"
            value={form.studyExplain}
            onChange={handleChange}
            className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-4 py-3 min-h-[180px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium transition placeholder:text-zinc-400"
            placeholder="스터디를 소개해 주세요!"
            required
          />
        </div>

        <div className="flex items-center gap-2 mt-1">
          <label
            htmlFor="isOpen"
            className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300"
          >
            <input
              type="checkbox"
              id="isOpen"
              name="isOpen"
              checked={form.isOpen}
              onChange={handleChange}
              className="w-4 h-4"
            />
            구인 공개(모집 상태)
          </label>
        </div>

        {error && (
          <div className="text-red-500 font-semibold text-center text-sm rounded-xl bg-red-50 px-4 py-2">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="mt-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg py-3 shadow-lg transition disabled:bg-zinc-400 disabled:cursor-not-allowed cursor-pointer"
          disabled={loading}
        >
          {loading ? "등록 중..." : "구인 등록"}
        </button>
      </form>
    </div>
  );
}
