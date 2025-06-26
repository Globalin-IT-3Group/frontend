import { useState, useEffect } from "react";
import { MdClose, MdChevronLeft, MdChevronRight } from "react-icons/md";
import StudyRecruitApi from "../../api/studyRecruitAPI";

export default function StudyRecruitFormModal({
  open,
  onClose,
  studyRoomId,
  studyRecruit,
  onSuccess,
  applicantList = [],
  applicantLoading = false,
  onPageChange = () => {},
  applicantPage = 0,
  applicantTotalPages = 1,
}) {
  const [tab, setTab] = useState("form");
  const [form, setForm] = useState({
    title: "",
    studyExplain: "",
    isOpen: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 지원자 상세 모달
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  useEffect(() => {
    if (open && studyRecruit) {
      setForm({
        title: studyRecruit.title || "",
        studyExplain: studyRecruit.studyExplain || "",
        isOpen: studyRecruit.isOpen ?? true,
      });
    } else if (open && !studyRecruit) {
      setForm({
        title: "",
        studyExplain: "",
        isOpen: true,
      });
    }
  }, [open, studyRecruit]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isEdit = !!(studyRecruit && studyRecruit.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title.trim()) return setError("제목을 입력하세요.");
    if (!form.studyExplain.trim()) return setError("스터디 설명을 입력하세요.");

    setLoading(true);
    try {
      if (isEdit) {
        await StudyRecruitApi.updateRecruit({
          recruitId: studyRecruit.id,
          studyRoomId,
          title: form.title,
          studyExplain: form.studyExplain,
          isOpen: form.isOpen,
        });
      } else {
        await StudyRecruitApi.createRecruit({
          studyRoomId,
          title: form.title,
          studyExplain: form.studyExplain,
          isOpen: form.isOpen,
        });
      }
      onSuccess?.();
      setForm({ title: "", studyExplain: "", isOpen: true });
      onClose?.();
    } catch {
      setError(
        isEdit
          ? "구인 수정에 실패했습니다. 다시 시도해주세요."
          : "구인 등록에 실패했습니다. 다시 시도해주세요."
      );
    } finally {
      setLoading(false);
    }
  };

  // 지원자 상세 모달 닫기
  const handleCloseApplicantModal = () => setSelectedApplicant(null);

  // 날짜 포맷
  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    return `신청 날짜: ${d.getFullYear()}/${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}/${String(d.getDate()).padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1.5px]">
      <div className="relative bg-white dark:bg-zinc-800 rounded-3xl shadow-2xl px-8 py-10 w-full max-w-xl flex flex-col gap-6 border border-zinc-200 dark:border-zinc-700">
        {/* 닫기 버튼 */}
        <button
          type="button"
          className="absolute right-7 top-6 text-3xl text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition cursor-pointer"
          onClick={onClose}
          aria-label="닫기"
        >
          <MdClose size={24} />
        </button>

        {/* --- 탭 버튼 --- */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setTab("form")}
            className={`px-4 py-2 rounded-t-xl font-bold text-md transition-all duration-150 ${
              tab === "form"
                ? "bg-white border-b-2 border-[#003CFF] text-[#003CFF] shadow"
                : "bg-zinc-100 text-zinc-400"
            }`}
          >
            {isEdit ? "구인 수정" : "구인 작성"}
          </button>
          {isEdit && (
            <button
              type="button"
              onClick={() => setTab("applicants")}
              className={`px-4 py-2 rounded-t-xl font-bold text-md transition-all duration-150 ${
                tab === "applicants"
                  ? "bg-white border-b-2 border-[#003CFF] text-[#003CFF] shadow"
                  : "bg-zinc-100 text-zinc-400"
              }`}
            >
              지원자 목록
            </button>
          )}
        </div>

        {/* --- 탭 내용 --- */}
        {tab === "form" ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* 제목 */}
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
            {/* 설명 */}
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
            {/* 체크박스/상태 메시지 */}
            <div className="flex flex-col gap-1 mt-1">
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
              {form.isOpen ? (
                <span className="text-blue-500 text-xs pl-6">
                  구인 공고가 <b>게시 됩니다.</b>
                </span>
              ) : (
                <span className="text-red-500 text-xs pl-6">
                  구인 공고가 <b>게시되지 않습니다.</b>
                </span>
              )}
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
        ) : (
          <div className="w-full min-h-[475px] flex flex-col justify-between h-[475px]">
            {applicantLoading ? (
              <div className="text-gray-400 py-4">불러오는 중...</div>
            ) : applicantList.length === 0 ? (
              <div className="text-gray-400 py-4">아직 지원자가 없습니다.</div>
            ) : (
              <ul className="flex flex-col gap-2 py-2">
                {applicantList.map((req) => (
                  <li
                    key={req.id}
                    className="bg-white dark:bg-zinc-900 rounded-2xl shadow hover:shadow-md cursor-pointer transition-all px-5 py-4 flex items-center min-h-[90px] justify-between"
                    onClick={() => setSelectedApplicant(req)}
                  >
                    {/* 좌측: 이미지, 닉네임, 상태, 제목 */}
                    <div className="flex items-center gap-5 flex-1">
                      <img
                        src={req.requester?.profileImage || "/pinga1.jpg"}
                        alt={req.requester?.nickname}
                        className="w-11 h-11 rounded-full object-cover"
                      />
                      <span className="font-bold min-w-[20px] truncate whitespace-nowrap">
                        {req.requester?.nickname}
                      </span>
                      <span
                        className={`text-xs font-semibold rounded px-2 py-1 ml-2 ${
                          req.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : req.status === "ACCEPTED"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {req.status === "PENDING"
                          ? "대기"
                          : req.status === "ACCEPTED"
                          ? "승인"
                          : "거절"}
                      </span>
                    </div>
                    {/* 우측: 날짜 */}
                    <div className="flex flex-col items-end justify-center min-w-[130px]">
                      <span className="text-xs text-gray-400 font-semibold">
                        {formatDate(req.requestedAt)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* 페이지네이션 (기존 스타일 따라감) */}
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => onPageChange(applicantPage - 1)}
                disabled={applicantPage === 0}
                className={`w-10 h-10 flex items-center justify-center rounded-full
                  ${
                    applicantPage === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                  }`}
                aria-label="이전"
              >
                <MdChevronLeft size={24} />
              </button>
              <span className="flex items-center px-4 font-semibold">
                {applicantPage + 1}/{applicantTotalPages}
              </span>
              <button
                onClick={() => onPageChange(applicantPage + 1)}
                disabled={applicantPage + 1 >= applicantTotalPages}
                className={`w-10 h-10 flex items-center justify-center rounded-full
                  ${
                    applicantPage + 1 >= applicantTotalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                  }`}
                aria-label="다음"
              >
                <MdChevronRight size={24} />
              </button>
            </div>

            {/* 지원자 상세 모달 */}
            {selectedApplicant && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="relative bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl w-[95vw] max-w-md px-8 py-10 flex flex-col items-center gap-2 border border-zinc-100 dark:border-zinc-700">
                  {/* 닫기 버튼 */}
                  <button
                    onClick={handleCloseApplicantModal}
                    className="absolute right-6 top-6 text-2xl text-gray-400 hover:text-blue-600 transition"
                    aria-label="닫기"
                  >
                    <MdClose size={28} />
                  </button>

                  {/* 프로필 */}
                  <div className="flex flex-col items-center gap-2 w-full mb-4">
                    <img
                      src={
                        selectedApplicant.requester?.profileImage ||
                        "/pinga1.jpg"
                      }
                      alt={selectedApplicant.requester?.nickname}
                      className="w-16 h-16 rounded-full object-cover shadow border-2 border-blue-100"
                    />
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold text-lg text-zinc-700 dark:text-zinc-100">
                        {selectedApplicant.requester?.nickname}
                      </span>
                      <span
                        className={`
                          text-xs font-semibold rounded px-2 py-1
                          ${
                            selectedApplicant.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : selectedApplicant.status === "ACCEPTED"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-500"
                          }
                        `}
                      >
                        {selectedApplicant.status === "PENDING"
                          ? "대기"
                          : selectedApplicant.status === "ACCEPTED"
                          ? "승인"
                          : "거절"}
                      </span>
                    </div>
                  </div>

                  {/* 신청 제목 */}
                  <div className="text-xl font-extrabold text-[#003CFF] text-center mb-2 break-words">
                    {selectedApplicant.requestTitle}
                  </div>

                  {/* 날짜 */}
                  <div className="mb-4 text-xs text-gray-400 font-semibold text-center w-full">
                    신청 날짜:{" "}
                    {selectedApplicant.requestedAt
                      ? selectedApplicant.requestedAt
                          .slice(0, 10)
                          .replace(/-/g, "/")
                      : "-"}
                  </div>

                  {/* 구분선 */}
                  <div className="w-full h-[1.5px] bg-gradient-to-r from-blue-100 via-blue-200 to-gray-200 mb-4" />

                  {/* 신청 메시지 */}
                  <div className="whitespace-pre-line text-gray-800 dark:text-gray-100 text-base text-center break-words max-w-full px-1">
                    {selectedApplicant.message?.trim() ? (
                      selectedApplicant.message
                    ) : (
                      <span className="text-gray-400">
                        신청 내용이 없습니다.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
