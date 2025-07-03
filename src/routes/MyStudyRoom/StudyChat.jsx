import { useCallback, useEffect } from "react";
import useGroupChatSocket from "../../hooks/useGroupChatSocket";
import StudyChatMessageList from "../../components/chat/StudyChat/StudyChatMessageList";
import StudyChatInputForm from "../../components/chat/StudyChat/StudyChatInputForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// isGroup prop으로 그룹방 여부 명확히 구분!
export default function StudyChat({ isGroup = true }) {
  const { studyRoomId } = useParams();
  const userId = useSelector((state) => state.auth.id);
  const roomId = studyRoomId;
  const { messages, sendMessage, markAsRead } = useGroupChatSocket(
    roomId,
    isGroup
  );

  useEffect(() => {
    if (messages.length > 0) {
      markAsRead();
    }
  }, [messages, markAsRead]);

  // 읽음 처리를 위한 콜백 (useCallback으로 메모이제이션)
  const handleReachBottom = useCallback(() => {
    markAsRead();
  }, [markAsRead]);

  return (
    <div className="w-full max-h-[650px] flex flex-col bg-white dark:bg-zinc-700 rounded-2xl shadow p-4">
      <StudyChatMessageList
        messages={messages}
        userId={userId}
        onReachBottom={handleReachBottom}
      />
      <StudyChatInputForm onSend={sendMessage} />
    </div>
  );
}
