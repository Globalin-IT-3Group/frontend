import { useCallback, useEffect, useState } from "react";
import StudyChatInputForm from "../../chat/StudyChat/StudyChatInputForm";
import StudyChatMessageList from "../../chat/StudyChat/StudyChatMessageList";
import { useSelector } from "react-redux";
import useGroupChatSocket from "../../../hooks/useGroupChatSocket";
import ChatRoomApi from "../../../api/chatRoomAPI";

export default function GroupChatRoom({ roomId, matchedRoom, refreshRooms }) {
  const userId = useSelector((state) => state.auth.id);

  // 1. studyRoomId State 추가
  const [studyRoomId, setStudyRoomId] = useState(null);

  // 2. chatRoomId → studyRoomId 변환 (roomId가 바뀔 때마다)
  useEffect(() => {
    if (!roomId) return;
    ChatRoomApi.getStudyRoomIdByChatRoomId(roomId).then(setStudyRoomId);
  }, [roomId]);

  // 3. studyRoomId 준비되면 훅 사용
  const { messages, sendMessage, markAsRead } = useGroupChatSocket(
    studyRoomId,
    true
  );

  // ...이하 기존 코드 동일...
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
    refreshRooms();
  };

  // studyRoomId가 준비되기 전엔 아무것도 보여주지 않음(로딩 처리 등)
  if (!studyRoomId) {
    return (
      <div className="flex-1 flex justify-center items-center">로딩 중...</div>
    );
  }

  return (
    <div className="flex flex-col min-w-[360px] max-w-[600px] min-h-[750px] max-h-[750px] w-full h-full rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] bg-white px-6 py-4 dark:bg-zinc-700 overflow-hidden mt-8 sm:mt-6">
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
