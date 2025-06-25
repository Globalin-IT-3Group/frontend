import { LuEye } from "react-icons/lu";

// StudyRequestResponse 기반 컴포넌트
export default function MyRequestBoxContainer({
  studyTitle,
  message,
  status,
  requestedAt,
  studyRecruit, // 모집글 요약정보
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

  // status 색상
  const statusColor =
    {
      PENDING: "text-yellow-600",
      ACCEPTED: "text-blue-600",
      REJECTED: "text-red-500",
    }[status] || "text-gray-400";

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-white rounded-4xl w-full min-w-0 shadow-[0_0_4px_rgba(0,0,0,0.1)] flex flex-col min-h-[420px] sm:min-h-[440px] lg:min-h-[460px] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_0_6px_rgba(0,0,0,0.1)] ${className}`}
    >
      {studyRecruit?.imageUrl && (
        <img
          src={studyRecruit.imageUrl}
          alt={studyTitle}
          className="rounded-t-4xl w-full h-[200px] object-cover object-top"
        />
      )}

      <div className="flex flex-col justify-between h-full p-6">
        {/* 💡 모집글 태그 */}
        {studyRecruit?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {studyRecruit.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold mb-2 break-words">{studyTitle}</h2>
          <p className="text-md text-gray-600 break-words line-clamp-2">
            {message}
          </p>
        </div>

        <div>
          <div className="border-t border-gray-100 my-4" />
          <div className="flex flex-wrap items-center justify-between gap-y-1">
            <div className="flex items-center">
              {studyRecruit?.leader?.profileImage && (
                <img
                  src={studyRecruit.leader.profileImage}
                  alt={studyRecruit.leader.nickname}
                  className="bg-black rounded-full w-6 h-6 object-cover"
                />
              )}
              <p className="font-bold text-sm ml-2 truncate max-w-[80px]">
                {studyRecruit?.leader?.nickname}
              </p>
            </div>

            <div className="text-sm text-gray-600 space-x-2 min-w-0 flex items-center">
              <span>{formatDateToLocalString(requestedAt)}</span>
              <span className="text-[#003CFF] font-semibold">
                {studyRecruit?.currentMemberCount}/{studyRecruit?.maxUserCount}{" "}
                모집
              </span>
              <span className="flex items-center ml-2 text-gray-400">
                <LuEye className="w-4 h-4 mr-1" />
                {studyRecruit?.viewCount}
              </span>
              {/* 상태 표시 */}
              <span className={`ml-4 font-bold ${statusColor}`}>
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
