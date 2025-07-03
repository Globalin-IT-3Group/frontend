import { useState } from "react";
import Swal from "sweetalert2";
import StudyRequestApi from "../../api/studyRequestAPI";

export default function RequestDetailModal({ request, onClose, onSuccess }) {
  const [tab, setTab] = useState("explain"); // "explain" or "request"
  const [loading, setLoading] = useState(false);

  if (!request) return null;

  const formatDateToLocalString = (dateString) => {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}/${mm}/${dd}`;
  };

  const statusColor =
    {
      PENDING: "text-yellow-600",
      ACCEPTED: "text-blue-600",
      REJECTED: "text-red-500",
    }[request.status] || "text-gray-400";

  const handleCancelRequest = async () => {
    const confirm = await Swal.fire({
      title: "신청 취소",
      text: "정말 신청을 취소하시겠습니까?",
      imageUrl: "/caution.svg",
      imageWidth: 120,
      imageHeight: 120,
      showCancelButton: true,
      confirmButtonColor: "#003CFF",
      cancelButtonColor: "#D9D9D9",
      confirmButtonText: "네, 취소할래요",
      cancelButtonText: "아니요",
    });
    if (!confirm.isConfirmed) return;

    setLoading(true);
    try {
      await StudyRequestApi.cancelMyRequest(request.id);
      await Swal.fire({
        title: "신청 취소 완료",
        text: "신청이 정상적으로 취소되었습니다.",
        imageUrl: "/success.svg",
        imageWidth: 120,
        imageHeight: 120,
        confirmButtonColor: "#003CFF",
        confirmButtonText: "확인",
      });
      onSuccess();
      onClose(); // 성공시 모달 닫기
    } catch (e) {
      Swal.fire({
        title: "취소 실패",
        text: e?.response?.data?.message
          ? `${e.response.data.message} 다시 시도해주세요.`
          : "잠시 후 다시 시도해 주세요.",
        imageUrl: "/error.svg",
        imageWidth: 120,
        imageHeight: 120,
        confirmButtonColor: "#003CFF",
        confirmButtonText: "확인",
      });
    } finally {
      setLoading(false);
    }
  };

  const TAB_MIN_HEIGHT = "180px";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-gradient-to-b from-blue-100 to-white dark:from-zinc-600 dark:to-zinc-700 w-[400px] min-h-[520px] rounded-3xl shadow-2xl flex flex-col items-center">
        {/* 상단 타이틀 & 리더 */}
        <div className="w-full flex flex-col items-center pt-8 px-8 pb-2">
          <h2 className="text-[1.6rem] font-extrabold text-center text-[#003CFF] dark:text-white mb-2 tracking-tight leading-snug drop-shadow-sm">
            {request.recruitTitle}
          </h2>
          <div className="flex items-center gap-2 mb-2">
            {request.leader?.profileImage && (
              <img
                src={request.leader.profileImage}
                alt={request.leader.nickname}
                className="rounded-full w-7 h-7 object-cover border-2 border-blue-100 shadow"
              />
            )}
            <span className="text-[1rem] font-semibold text-gray-600 dark:text-gray-300">
              {request.leader?.nickname}
            </span>
            <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold bg-[#003CFF] text-white">
              리더
            </span>
          </div>

          <div className="flex gap-4 mt-1 items-center">
            <span className="text-xs text-gray-400 font-semibold dark:text-gray-300">
              신청 날짜
            </span>
            <span className="text-sm text-gray-700 font-semibold dark:text-gray-300">
              {formatDateToLocalString(request.requestedAt)}
            </span>
            <span className={`text-xs font-bold ml-2 ${statusColor}`}>
              {request.status === "PENDING" && "대기중"}
              {request.status === "ACCEPTED" && "승인됨"}
              {request.status === "REJECTED" && "거절됨"}
            </span>
          </div>
        </div>

        {/* 탭 (왼쪽 정렬, 카드와 일치) */}
        <div className="w-full flex justify-start mt-3 mb-1 pl-8">
          <button
            onClick={() => setTab("explain")}
            className={`px-6 py-2 rounded-t-2xl border-b-2 font-bold text-md transition-all duration-150 cursor-pointer ${
              tab === "explain"
                ? "bg-white dark:bg-zinc-800 text-[#003CFF] border-b-2 dark:text-white border-[#003CFF] shadow"
                : "bg-transparent text-gray-400 "
            }`}
          >
            모집글 소개
          </button>
          <button
            onClick={() => setTab("request")}
            className={`px-6 py-2 rounded-t-2xl border-b-2 font-bold text-md transition-all duration-150 cursor-pointer  ${
              tab === "request"
                ? "bg-white dark:bg-zinc-800  text-[#003CFF] border-b-2 dark:text-white border-[#003CFF] shadow"
                : "bg-transparent text-gray-400"
            }`}
          >
            내 신청서
          </button>
        </div>

        {/* 탭 내용 (카드와 탭의 왼쪽 정렬 일치, 높이 고정) */}
        <div className="flex-1 w-full flex flex-col items-start px-8 pb-2">
          <div
            className="w-full bg-white rounded-2xl shadow  px-6 py-6 flex flex-col gap-5 transition-all duration-200 mt-2"
            style={{ minHeight: TAB_MIN_HEIGHT }}
          >
            {tab === "explain" ? (
              // 모집글 설명
              <div className="flex flex-col h-full ">
                <div className="text-sm font-bold text-[#003CFF]  mb-1">
                  모집글 소개
                </div>
                <div className="text-gray-700 text-[1rem] whitespace-pre-line break-words flex-1 overflow-y-auto">
                  {request.recruitExplain || "소개 정보가 없습니다."}
                </div>
              </div>
            ) : (
              // 내 신청서
              <>
                <div>
                  <div className="text-sm font-bold text-[#003CFF] mb-1">
                    신청 제목
                  </div>
                  <div className="text-gray-700  font-semibold text-[1.05rem] break-words">
                    {request.requestTitle}
                  </div>
                </div>
                <div className="h-[1px] w-full bg-blue-100" />
                <div>
                  <div className="text-sm font-bold text-[#003CFF] mb-1">
                    신청 내용
                  </div>
                  <div className="text-gray-700 text-[1rem] whitespace-pre-line break-words min-h-[70px] ">
                    {request.requestMessage}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-center gap-3 w-full mb-6 mt-2">
          <button
            onClick={onClose}
            className="px-8 py-2 rounded-3xl text-base font-bold bg-[#003CFF] text-white shadow hover:bg-[#0536D7] active:scale-95 transition-all duration-150 cursor-pointer"
            disabled={loading}
          >
            닫기
          </button>
          {/* 대기중(PENDING)일 때만 활성화 */}
          {request.status === "PENDING" && (
            <button
              onClick={handleCancelRequest}
              className="px-8 py-2 rounded-3xl text-gray-400 font-bold bg-white  text-[#003CFF] border border-gray-400 shadow hover:bg-blue-50 active:scale-95 transition-all duration-150 cursor-pointer"
              disabled={loading}
            >
              신청 취소
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
