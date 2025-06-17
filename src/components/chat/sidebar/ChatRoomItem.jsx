import { useNavigate } from "react-router-dom";
import chatRoomApi from "../../../api/chatRoomAPI"; // (import 추가)

export default function ChatRoomItem({ room, refreshRooms }) {
  const navigate = useNavigate();
  const { roomId, unreadCount, lastMessage, lastMessageAt, otherUser } = room;

  const handleClick = async () => {
    // ✅ 1. 채팅방 입장 시 백엔드에 읽음 처리 요청
    await chatRoomApi.markAsRead(roomId); // 이 메서드가 구현되어 있어야 함
    // ✅ 2. 리스트 새로고침
    refreshRooms && refreshRooms();

    // ✅ 3. 채팅방 이동
    navigate(`/chat?roomId=${roomId}`, {
      state: { otherUser }, // 👈 같이 넘긴다!
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
          {/* ✅ 안 읽은 메시지(뱃지) */}
          {unreadCount > 0 && (
            <span className="ml-2 inline-block w-5 h-5 text-xs rounded-full bg-red-500 text-white text-center leading-5">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="text-sm text-gray-500 truncate">
          {lastMessage || "대화 없음"}
        </div>
      </div>
    </li>
  );
}
