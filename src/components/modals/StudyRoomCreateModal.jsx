import { useEffect, useState } from "react";
import StudyRoomApi from "../../api/studyRoomAPI";

// 고정 태그 목록
const TAGS = ["JLPT", "회화", "취업", "자격증", "스터디", "비즈니스일본어"];

const DEFAULT_IMAGE_URL =
  "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg";

const DEFAULT_FORM = {
  name: "",
  rule: "",
  notice: "",
  imageUrl: "",
  maxUserCount: 4,
  tags: [],
};

export default function StudyRoomCreateModal({ open, onClose, onSuccess }) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [maxUserError, setMaxUserError] = useState(false);

  useEffect(() => {
    if (open) {
      setForm(DEFAULT_FORM);
      setError("");
      setMaxUserError(false);
    }
  }, [open]);

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
          스터디룸 생성
        </h2>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-zinc-700 dark:text-zinc-200">
            방 이름 <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-medium transition placeholder:text-zinc-400"
            placeholder="방 이름을 입력하세요"
            required
            maxLength={50}
          />
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
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-zinc-700 dark:text-zinc-200">
            대표 이미지 URL
          </label>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-medium transition placeholder:text-zinc-400"
            placeholder="이미지 URL (기본값: 핑가)"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-zinc-700 dark:text-zinc-200">
            최대 인원수
          </label>
          <input
            type="number"
            name="maxUserCount"
            value={form.maxUserCount}
            onChange={handleChange}
            min={2}
            max={4}
            className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 px-4 py-3 w-32 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-medium transition"
          />
          {maxUserError && (
            <span className="text-xs text-red-500 mt-1">
              최대 인원은 4명입니다!
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-zinc-700 dark:text-zinc-200">
            태그 선택 <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2 mt-1">
            {TAGS.map((tag) => (
              <label
                key={tag}
                className={`flex items-center gap-1 cursor-pointer select-none rounded-full px-3 py-1.5 text-sm font-semibold
                  ${
                    form.tags.includes(tag)
                      ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-700/30 dark:text-indigo-200 ring-2 ring-indigo-400"
                      : "bg-zinc-100 dark:bg-zinc-900/40 text-zinc-400"
                  }
                  transition
                `}
              >
                <input
                  type="checkbox"
                  checked={form.tags.includes(tag)}
                  onChange={() => handleTagToggle(tag)}
                  className="accent-indigo-500 w-4 h-4"
                  hidden
                />
                <span>{tag}</span>
              </label>
            ))}
          </div>
        </div>
        {error && (
          <div className="text-red-500 font-semibold text-center text-sm rounded-xl bg-red-50 px-4 py-2">
            {error}
          </div>
        )}
        <button
          type="submit"
          className="rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-lg py-3 shadow-lg transition disabled:bg-zinc-400 disabled:cursor-not-allowed cursor-pointer"
          disabled={loading}
        >
          {loading ? "생성 중..." : "방 생성하기"}
        </button>
      </form>
    </div>
  );
}
