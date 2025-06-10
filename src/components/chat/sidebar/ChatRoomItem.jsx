import { useNavigate } from "react-router-dom";

export default function ChatRoomItem({ room }) {
  const navigate = useNavigate();
  const { roomId, unreadCount, lastMessage, lastMessageAt, otherUser } = room;

  const handleClick = () => {
    navigate(`/chat?roomId=${roomId}`, {
      state: { otherUser }, // 👈 여기서 같이 넘긴다!
    });
  };

  return (
    <li
      onClick={handleClick}
      className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-700"
    >
      {/* 프로필 이미지 */}
      <img
        src={otherUser?.profileImage || "/default-profile.png"}
        alt="profile"
        className="w-10 h-10 rounded-full object-cover"
      />

      {/* 닉네임 + 마지막 메시지 */}
      <div className="flex-1 overflow-hidden">
        <div className="flex justify-between items-center">
          <span className="font-semibold truncate">{otherUser?.nickname}</span>
          {unreadCount > 0 && (
            <span className="text-xs text-red-500 ml-2">● {unreadCount}</span>
          )}
        </div>
        <div className="text-sm text-gray-500 truncate">
          {lastMessage || "대화 없음"}
        </div>
      </div>
    </li>
  );
}
