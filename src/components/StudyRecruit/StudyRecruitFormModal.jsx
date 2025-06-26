import { useState, useEffect } from "react";
import { MdClose, MdChevronLeft, MdChevronRight } from "react-icons/md";
import StudyRecruitApi from "../../api/studyRecruitAPI";
import StudyRequestApi from "../../api/studyRequestAPI";
import RequesterDetailModal from "./RequesterDetailModal";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function StudyRecruitFormModal({
  leaderId,
  open,
  onClose,
  studyRoomId,
  studyRecruit,
  onSuccess,
  onMemberChanged,
}) {
  const [tab, setTab] = useState("form");
  const [form, setForm] = useState({
    title: "",
    studyExplain: "",
    isOpen: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // 지원자 상태 관리
  const [applicantList, setApplicantList] = useState([]);
  const [applicantPage, setApplicantPage] = useState(0);
  const [applicantTotalPages, setApplicantTotalPages] = useState(1);
  const [applicantLoading, setApplicantLoading] = useState(false);

  // 지원자 상세 모달
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // 상태 탭 (지원자 상태별 필터: 대기/승인)
  const [statusTab, setStatusTab] = useState("PENDING"); // or "ACCEPTED"

  // 리더 체크
  const userId = useSelector((state) => state.auth.id);
  const isLeader = leaderId === userId;

  // 폼 세팅
  useEffect(() => {
    if (open && studyRecruit) {
      setForm({
        title: studyRecruit.title || "",
        studyExplain: studyRecruit.studyExplain || "",
        isOpen: studyRecruit.isOpen ?? true,
      });
      // 모집글이 열리면 지원자 목록 로드
      reloadApplicantList(0, statusTab);
    } else if (open && !studyRecruit) {
      setForm({
        title: "",
        studyExplain: "",
        isOpen: true,
      });
    }
    // eslint-disable-next-line
  }, [open, studyRecruit]);

  // statusTab이나 페이지가 바뀌면 목록 다시 로딩
  useEffect(() => {
    if (open && studyRecruit?.id) {
      reloadApplicantList(applicantPage, statusTab);
    }
    // eslint-disable-next-line
  }, [statusTab, applicantPage, studyRecruit?.id, open]);

  // 지원자 목록 불러오기
  const reloadApplicantList = async (page = 0, status = statusTab) => {
    if (!studyRecruit?.id) return;
    setApplicantLoading(true);
    try {
      const res = await StudyRequestApi.getRequestsByRecruit({
        studyRecruitId: studyRecruit.id,
        page,
        size: 4,
        status, // status 필터도 API에서 받을 수 있도록 구현 (필요하다면 백엔드도 수정)
      });
      setApplicantList(res.content || []);
      setApplicantTotalPages(res.totalPages || 1);
    } finally {
      setApplicantLoading(false);
    }
  };

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

  // 상태 변경 (승인/거절)
  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await StudyRequestApi.updateRequestStatus(requestId, newStatus);
      await reloadApplicantList(applicantPage, statusTab);
      setSelectedApplicant(null);
      // 승인 시에만 알림!
      if (newStatus === "ACCEPTED") {
        onMemberChanged?.();
        Swal.fire({
          title: "승인 완료!",
          text: "해당 지원자가 스터디 멤버로 추가되었습니다.",

          imageUrl: "/success.svg",
          imageWidth: 120,
          imageHeight: 120,

          confirmButtonText: "확인",
          timer: 1500,
        });
      } else if (newStatus === "REJECTED") {
        Swal.fire({
          title: "거절 완료",
          text: "지원자가 거절 처리되었습니다.",

          imageUrl: "/error.svg",
          imageWidth: 120,
          imageHeight: 120,

          confirmButtonText: "확인",
          timer: 1500,
        });
      }
    } catch (e) {
      Swal.fire({
        imageUrl: "/error.svg",
        imageWidth: 120,
        imageHeight: 120,
        title: "승인 실패",
        text: `${e.response.data.message}`,
      });
    }
  };

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
      <div className="relative bg-white dark:bg-zinc-800 rounded-3xl shadow-2xl px-8 py-10 w-full max-w-xl flex flex-col gap-3 border border-zinc-200 dark:border-zinc-700">
        {/* 닫기 버튼 */}
        <button
          type="button"
          className="absolute right-7 top-6 text-3xl text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition cursor-pointer"
          onClick={onClose}
          aria-label="닫기"
        >
          <MdClose size={24} />
        </button>

        {/* 탭 버튼 */}
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
            {/* 상태별 필터 탭 */}
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => {
                  setStatusTab("PENDING");
                  setApplicantPage(0);
                }}
                className={`px-[13px] py-1 rounded-xl font-bold text-sm transition-all ${
                  statusTab === "PENDING"
                    ? "bg-yellow-100 text-yellow-700 shadow"
                    : "bg-zinc-100 text-zinc-500"
                }`}
              >
                대기 지원자
              </button>
              <button
                onClick={() => {
                  setStatusTab("ACCEPTED");
                  setApplicantPage(0);
                }}
                className={`px-4 py-1 rounded-xl font-bold text-sm transition-all ${
                  statusTab === "ACCEPTED"
                    ? "bg-blue-100 text-blue-700 shadow"
                    : "bg-zinc-100 text-zinc-500"
                }`}
              >
                승인된 지원자
              </button>
            </div>
            {/* 지원자 리스트 */}
            {applicantLoading ? (
              <div className="text-gray-400 py-4">불러오는 중...</div>
            ) : applicantList.length === 0 ? (
              <div className="text-gray-400 py-4 text-center">
                아직 지원자가 없습니다.
              </div>
            ) : (
              <ul className="flex flex-col gap-2 py-2">
                {applicantList.map((req) => (
                  <li
                    key={req.id}
                    className="bg-white dark:bg-zinc-900 rounded-2xl shadow hover:shadow-md cursor-pointer transition-all px-5 py-4 flex items-center max-h-[70px] justify-between"
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

            {/* 페이지네이션 */}
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => setApplicantPage((p) => Math.max(0, p - 1))}
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
                onClick={() =>
                  setApplicantPage((p) =>
                    Math.min(applicantTotalPages - 1, p + 1)
                  )
                }
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
              <RequesterDetailModal
                open={!!selectedApplicant}
                applicant={selectedApplicant}
                onClose={handleCloseApplicantModal}
                onStatusChange={handleStatusChange}
                isLeader={isLeader}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
