import { useState } from "react";
import StudyRoomApi from "../../api/studyRoomAPI";

export default function InquiryFormModal({ open, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    rule: "",
    notice: "",
    isPrivate: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [maxUserError, setMaxUserError] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "maxUserCount") {
      let num = Number(value);

      // 2 미만 입력 방지
      if (num < 2) num = 2;
      // 4 초과 입력 방지
      if (num > 4) num = 4;

      // 4면 무조건 안내문구
      setMaxUserError(num === 4);

      setForm((f) => ({ ...f, maxUserCount: num }));
      return;
    }
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleTagToggle = (tag) => {
    setForm((f) =>
      f.tags.includes(tag)
        ? { ...f, tags: f.tags.filter((t) => t !== tag) }
        : { ...f, tags: [...f.tags, tag] }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) {
      setError("스터디룸 이름을 입력하세요.");
      return;
    }
    if (form.tags.length === 0) {
      setError("태그를 하나 이상 선택하세요.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...form,
        imageUrl: form.imageUrl?.trim() ? form.imageUrl : DEFAULT_IMAGE_URL,
        maxUserCount: form.maxUserCount > 4 ? 4 : form.maxUserCount,
      };
      await StudyRoomApi.createStudyRoom(payload);
      setLoading(false);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setLoading(false);
      setError(
        err?.response?.data?.message ||
          "방 생성에 실패했습니다. 잠시 후 다시 시도하세요."
      );
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
          className="absolute right-7 top-6 text-3xl text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition"
          onClick={onClose}
          aria-label="닫기"
        >
          &times;
        </button>
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-2 tracking-tight">
          문의하기
        </h2>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-zinc-700 dark:text-zinc-200">
            제목 <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-medium transition placeholder:text-zinc-400"
            placeholder="제목을 입력하세요"
            required
            maxLength={50}
          />
          <div className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              id="isPrivate"
              name="isPrivate"
              checked={form.isPrivate}
              onChange={(e) =>
                setForm((f) => ({ ...f, isPrivate: e.target.checked }))
              }
              className="w-4 h-4 accent-indigo-500"
            />
            <label
              htmlFor="isPrivate"
              className="text-sm text-zinc-600 dark:text-zinc-300"
            >
              비밀글
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-zinc-700 dark:text-zinc-200">
            규칙
          </label>
          <textarea
            name="rule"
            value={form.rule}
            onChange={handleChange}
            className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-4 py-3 min-h-[56px] resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 font-medium transition placeholder:text-zinc-400"
            placeholder="스터디 규칙을 입력하세요"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-zinc-700 dark:text-zinc-200">
            공지사항
          </label>
          <textarea
            name="notice"
            value={form.notice}
            onChange={handleChange}
            className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-4 py-3 min-h-[48px] resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 font-medium transition placeholder:text-zinc-400"
            placeholder="공지사항 (선택)"
          />
        </div>

        {error && (
          <div className="text-red-500 font-semibold text-center text-sm rounded-xl bg-red-50 px-4 py-2">
            {error}
          </div>
        )}
        <button
          type="submit"
          className="mt-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-lg py-3 shadow-lg transition disabled:bg-zinc-400 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "등록 중..." : "문의하기"}
        </button>
      </form>
    </div>
  );
}
