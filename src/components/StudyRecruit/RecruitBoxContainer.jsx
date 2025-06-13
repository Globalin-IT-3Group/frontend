export default function RecruitBoxContainer({
  image,
  roomName,
  studyExplain,
  profileImage,
  leader,
  createdAt,
  viewCount,
  userCount,
  className = "",
}) {
  const formatDateToLocalString = (dateString) => {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}/${mm}/${dd}`;
  };

  return (
    <div
      className={`bg-white rounded-4xl w-full min-w-0 p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)] flex flex-col min-h-[420px] sm:min-h-[440px] lg:min-h-[460px] ${className}`}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          {image && (
            <img
              src={image}
              alt={roomName}
              className="rounded-t-4xl w-full h-[200px] object-cover object-top"
            />
          )}
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2 break-words">{roomName}</h2>
            <p className="text-md text-gray-600 break-words line-clamp-2">
              {studyExplain}
            </p>
          </div>
        </div>

        <div>
          <div className="border-t border-gray-100 my-4" />

          <div className="flex flex-wrap items-center justify-between px-4 pb-4 gap-y-1">
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

            <div className="text-sm text-gray-600 space-x-2 min-w-0">
              <span className="break-words">
                {formatDateToLocalString(createdAt)}
              </span>
              <span className="text-[#003CFF] font-semibold break-words">
                {userCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
