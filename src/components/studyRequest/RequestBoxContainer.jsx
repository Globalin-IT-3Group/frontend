export default function RequestBoxContainer({
  recruitTitle,
  recruitImage,
  requestTitle,
  requestMessage,
  status,
  requestedAt,
  onClick,
  className = "",
}) {
  // 날짜 포맷
  const formatDateToLocalString = (dateString) => {
    if (!dateString) return "";
    const cleaned = dateString.split(".")[0];
    const date = new Date(cleaned);
    if (isNaN(date.getTime())) return "";
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}/${mm}/${dd}`;
  };

  // 상태 색상
  const statusColor =
    {
      PENDING: "text-yellow-600",
      ACCEPTED: "text-blue-600",
      REJECTED: "text-red-500",
    }[status] || "text-gray-400";

  // 신청 메시지 자르기
  const getEllipsisMessage = (msg) => {
    if (!msg) return "";
    return msg.length > 10 ? msg.slice(0, 10) + "..." : msg;
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-white dark:bg-zinc-700 rounded-4xl w-full min-w-0 shadow-[0_0_4px_rgba(0,0,0,0.1)] flex flex-col min-h-[420px] sm:min-h-[440px] lg:min-h-[460px] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_0_6px_rgba(0,0,0,0.1)] ${className}`}
    >
      {/* 썸네일 (스터디 이미지) */}
      <img
        src={recruitImage || "/6.jpg"}
        alt={recruitTitle || "스터디 썸네일"}
        className="rounded-t-4xl w-full h-[200px] object-cover object-top "
      />

      <div className="flex flex-col justify-between h-full p-6">
        {/* 중간 영역: 신청 제목/메시지 */}
        <div>
          <h3 className="text-xl font-bold mb-2 break-words text-gray-900 dark:text-white">
            {requestTitle}
          </h3>
          <p className="text-md text-gray-600 break-words dark:text-white">
            {getEllipsisMessage(requestMessage)}
          </p>
        </div>

        {/* 하단 정보: 스터디명 / 신청 날짜 / 상태 */}
        <div>
          <div className="border-t border-gray-100 my-4 dark:border-zinc-600" />
          <div className="flex items-center justify-between">
            {/* 왼쪽: 스터디명 */}
            <span className="font-bold text-sm ml-2 truncate max-w-[80px] text-gray-800 dark:text-gray-200">
              {recruitTitle}
            </span>
            {/* 오른쪽: 날짜 + 상태 */}
            <div className="flex items-center gap-x-4 text-sm">
              <span className="text-xs text-gray-600 dark:text-gray-300 space-x-2 min-w-0 flex items-center whitespace-nowrap">
                신청일
              </span>
              <span className="break-words dark:text-gray-300">
                {formatDateToLocalString(requestedAt)}
              </span>
              <span
                className={`ml-2 font-bold whitespace-nowrap ${statusColor}`}
              >
                {status === "PENDING" && "대기중"}
                {status === "ACCEPTED" && "승인됨"}
                {status === "REJECTED" && "거절됨"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
