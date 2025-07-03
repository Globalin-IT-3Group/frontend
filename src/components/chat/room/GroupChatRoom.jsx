import { useCallback, useEffect } from "react";
import StudyChatInputForm from "../../chat/StudyChat/StudyChatInputForm";
import StudyChatMessageList from "../../chat/StudyChat/StudyChatMessageList";
import { useSelector } from "react-redux";
import useGroupChatSocket from "../../../hooks/useGroupChatSocket";

export default function GroupChatRoom({ roomId, matchedRoom, refreshRooms }) {
  const userId = useSelector((state) => state.auth.id);
  const { messages, sendMessage, markAsRead } = useGroupChatSocket(
    roomId,
    true
  );

  // 프로필 이미지
  const profileImage = matchedRoom.studyRoomImageUrl;

  const getMemberCount = () => {
    const others = matchedRoom.otherUsers || [];
    if (others.length === 1) {
      return others[0]?.id === userId ? 1 : 2;
    }

    return others.length + 1;
  };

  const displayName = `${
    matchedRoom.studyRoomName || "그룹 채팅"
  } (${getMemberCount()}명)`;

  useEffect(() => {
    if (messages.length > 0) {
      markAsRead();
    }
  }, [messages, markAsRead]);

  const handleReachBottom = useCallback(() => {
    markAsRead();
  }, [markAsRead]);

  const handleSend = (text) => {
    sendMessage(text);
    refreshRooms(); // 이거!
  };

  return (
    <div
      className="flex flex-col
        min-w-[360px] max-w-[600px]  // 최소, 최대 너비
        min-h-[750px] max-h-[750px]  // 최소, 최대 높이
        w-full h-full                // 필요시 부모 기준 100%
        rounded-2xl 
        shadow-[0_0_6px_rgba(0,0,0,0.1)]
        bg-white
        px-6 py-4
        dark:bg-zinc-700
        overflow-hidden 
        mt-8 sm:mt-6        "
    >
      {/* 상단: 채팅방 정보 */}
      <div className="flex items-center gap-4 px-1 my-4 border-gray-300 rounded-xl dark:border-zinc-600 bg-white dark:bg-zinc-700">
        <img
          src={profileImage}
          alt="profile"
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className="text-2xl md:text-2xl font-semibold dark:text-white">
          {displayName}
        </div>
      </div>
      {/* 메시지 리스트 */}
      <StudyChatMessageList
        messages={messages}
        userId={userId}
        onReachBottom={handleReachBottom}
      />
      {/* 입력 폼 */}
      <StudyChatInputForm onSend={handleSend} />
    </div>
  );
}
