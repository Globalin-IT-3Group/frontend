import { LuEye } from "react-icons/lu";

export default function RecruitBoxContainer({
  image,
  roomName,
  studyExplain,
  profileImage,
  leader,
  createdAt,
  viewCount,
  userCount,
  tags = [],
  className = "",
  onClick,
}) {
  const formatDateToLocalString = (dateString) => {
    if (!dateString) return "";
    // 마이크로초(.) 이하를 제거 (ex: 2025-06-21T03:33:48)
    const cleaned = dateString.split(".")[0];
    const date = new Date(cleaned);
    if (isNaN(date.getTime())) return ""; // 혹시라도 NaN일 때 빈 문자열 반환
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}/${mm}/${dd}`;
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-white rounded-4xl w-full min-w-0 shadow-[0_0_4px_rgba(0,0,0,0.1)] flex flex-col min-h-[420px] sm:min-h-[440px] lg:min-h-[460px] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_0_6px_rgba(0,0,0,0.1)] ${className}`}
    >
      {image && (
        <img
          src={image}
          alt={roomName}
          className="rounded-t-4xl w-full h-[200px] object-cover object-top"
        />
      )}

      <div className="flex flex-col justify-between h-full p-6">
        {/* 💡 태그 영역 */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
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
          <h2 className="text-xl font-bold mb-2 break-words">{roomName}</h2>
          <p className="text-md text-gray-600 break-words line-clamp-2">
            {studyExplain}
          </p>
        </div>

        <div>
          <div className="border-t border-gray-100 my-4" />
          <div className="flex flex-wrap items-center justify-between gap-y-1">
            <div className="flex items-center">
              {profileImage && (
                <img
                  src={profileImage}
                  alt={leader}
                  className="bg-black rounded-full w-6 h-6 object-cover"
                />
              )}
              <p className="font-bold text-sm ml-2 truncate max-w-[80px]">
                {leader}
              </p>
            </div>

            <div className="text-sm text-gray-600 space-x-2 min-w-0 flex items-center">
              <span className="break-words">
                {formatDateToLocalString(createdAt)}
              </span>
              <span className="text-[#003CFF] font-semibold break-words">
                {userCount}
              </span>
              {/* 👁️ 조회수 (LuEye) */}
              <span className="flex items-center ml-2 text-gray-400">
                <LuEye className="w-4 h-4 mr-1" />
                {viewCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
