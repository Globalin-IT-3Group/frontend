import { MdClose } from "react-icons/md";

/**
 * 지원자 상세 모달
 * @param {object} props
 * @param {boolean} open
 * @param {object} applicant
 * @param {function} onClose
 */
export default function RequesterDetailModal({
  open,
  applicant,
  onClose,
  onStatusChange,
  isLeader,
}) {
  if (!open || !applicant) return null;

  // 날짜 포맷 함수 (필요하다면 utils로 빼도 OK)
  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    return `신청 날짜: ${d.getFullYear()}/${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}/${String(d.getDate()).padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl w-[95vw] max-w-md px-8 py-10 flex flex-col items-center gap-2 border border-zinc-100 dark:border-zinc-700">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-2xl text-gray-400 hover:text-blue-600 transition"
          aria-label="닫기"
        >
          <MdClose size={28} />
        </button>
        {/* 프로필 */}
        <div className="flex flex-col items-center gap-2 w-full mb-4">
          <img
            src={applicant.requester?.profileImage || "/pinga1.jpg"}
            alt={applicant.requester?.nickname}
            className="w-16 h-16 rounded-full object-cover shadow border-2 border-blue-100"
          />
          <div className="flex items-center gap-2 mt-1">
            <span className="font-bold text-lg text-zinc-700 dark:text-zinc-100">
              {applicant.requester?.nickname}
            </span>
            <span
              className={`
                text-xs font-semibold rounded px-2 py-1
                ${
                  applicant.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-700"
                    : applicant.status === "ACCEPTED"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-500"
                }
              `}
            >
              {applicant.status === "PENDING"
                ? "대기"
                : applicant.status === "ACCEPTED"
                ? "승인"
                : "거절"}
            </span>
          </div>
        </div>
        {/* 신청 제목 */}
        <div className="text-xl font-extrabold text-[#003CFF] text-center mb-2 break-words">
          {applicant.requestTitle}
        </div>
        {/* 날짜 */}
        <div className="mb-4 text-xs text-gray-400 font-semibold text-center w-full">
          {formatDate(applicant.requestedAt)}
        </div>
        {/* 구분선 */}
        <div className="w-full h-[1.5px] bg-gradient-to-r from-blue-100 via-blue-200 to-gray-200 mb-4" />
        {/* 신청 메시지 */}
        <div className="whitespace-pre-line text-gray-800 dark:text-gray-100 text-base text-center break-words max-w-full px-1">
          {applicant.message?.trim() ? (
            applicant.message
          ) : (
            <span className="text-gray-400">신청 내용이 없습니다.</span>
          )}
        </div>
        {/* 상태 변경 버튼 (리더만 노출) */}
        {applicant.status === "PENDING" && isLeader && (
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => onStatusChange(applicant.id, "ACCEPTED")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-xl shadow transition"
            >
              승인(멤버로 추가)
            </button>
            <button
              onClick={() => onStatusChange(applicant.id, "REJECTED")}
              className="bg-red-400 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-xl shadow transition"
            >
              거절
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
