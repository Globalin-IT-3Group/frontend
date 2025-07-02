import chatRoomApi from "../../../api/chatRoomAPI"; // (import 추가)

function formatLastMessageAt(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  let hour = date.getHours();
  const min = String(date.getMinutes()).padStart(2, "0");
  const isAM = hour < 12;
  const period = isAM ? "오전" : "오후";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${year}.${month}.${day} ${period} ${hour12}:${min}`;
}

export default function ChatRoomItem({
  room,
  refreshRooms,
  onClickRoom,
  myUserId,
}) {
  const {
    roomId,
    unreadCount,
    lastMessage,
    lastMessageAt,
    otherUsers,
    roomType,
    studyRoomName,
    studyRoomImageUrl,
  } = room;

  const handleClick = async () => {
    await chatRoomApi.markAsRead(roomId);
    refreshRooms && refreshRooms();
    onClickRoom && onClickRoom(room.roomId);
  };

  // 1:1 채팅인데 자기 자신만 있을 경우
  const isAloneInSingleChat =
    roomType === "SINGLE" &&
    otherUsers.length === 1 &&
    otherUsers[0]?.id === myUserId;

  const displayUser =
    roomType === "GROUP" ? null : isAloneInSingleChat ? null : otherUsers[0];

  // 프로필 이미지
  const profileImage =
    roomType === "GROUP"
      ? studyRoomImageUrl || "/default-profile.png"
      : displayUser?.profileImage || "/default-profile.png";

  // 닉네임 또는 스터디 이름
  const displayName =
    roomType === "GROUP"
      ? studyRoomName || "그룹 채팅"
      : isAloneInSingleChat
      ? "대화 상대 없음"
      : displayUser?.nickname || "알 수 없음";

  const displayUnreadCount = isAloneInSingleChat ? 0 : unreadCount;

  return (
    <li
      onClick={handleClick}
      className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-700"
    >
      {/* 프로필/스터디방 이미지 */}
      <img
        src={profileImage}
        alt="profile"
        className="w-10 h-10 rounded-full object-cover"
      />

      {/* 닉네임 또는 스터디방 이름 + 마지막 메시지 */}
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <span className="font-semibold truncate">{displayName}</span>
          {displayUnreadCount > 0 && (
            <span className="ml-2 inline-block w-5 h-5 text-xs rounded-full bg-red-500 text-white text-center leading-5">
              {displayUnreadCount}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-200 truncate">
          <span className="truncate">{lastMessage || "대화 없음"}</span>
          <span className="ml-2 text-xs text-gray-400 min-w-fit">
            {formatLastMessageAt(lastMessageAt)}
          </span>
        </div>
      </div>
    </li>
  );
}
