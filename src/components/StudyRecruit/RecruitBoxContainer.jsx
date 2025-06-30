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
    const cleaned = dateString.split(".")[0];
    const date = new Date(cleaned);
    if (isNaN(date.getTime())) return "";
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}/${mm}/${dd}`;
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-white dark:bg-zinc-700 rounded-4xl w-full min-w-0 shadow-[0_0_4px_rgba(0,0,0,0.1)] flex flex-col min-h-[420px] sm:min-h-[440px] lg:min-h-[460px] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_0_6px_rgba(0,0,0,0.1)] ${className}`}
    >
      {image && (
        <img
          src={image}
          alt={roomName}
          className="rounded-t-4xl w-full h-[200px] object-cover object-top"
        />
      )}

      <div className="flex flex-col justify-between h-full p-6">
        {/* 태그 영역 */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-700 dark:bg-blue-200 dark:text-blue-800 text-xs font-bold px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold mb-2 break-words text-gray-900 dark:text-white">
            {roomName}
          </h2>
          <p className="text-md text-gray-600 dark:text-gray-300 break-words line-clamp-2">
            {studyExplain}
          </p>
        </div>

        <div>
          <div className="border-t border-gray-100 dark:border-zinc-600 my-4" />
          <div className="flex flex-wrap items-center justify-between gap-y-1">
            <div className="flex items-center">
              {profileImage && (
                <img
                  src={profileImage}
                  alt={leader}
                  className="bg-black rounded-full w-6 h-6 object-cover"
                />
              )}
              <p className="font-bold text-sm ml-2 truncate max-w-[80px] text-gray-800 dark:text-gray-200">
                {leader}
              </p>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-300 space-x-2 min-w-0 flex items-center">
              <span className="break-words">
                {formatDateToLocalString(createdAt)}
              </span>
              <span className="text-[#003CFF] dark:text-blue-400 font-semibold break-words">
                {userCount}
              </span>
              <span className="flex items-center ml-2 text-gray-400 dark:text-gray-300">
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
