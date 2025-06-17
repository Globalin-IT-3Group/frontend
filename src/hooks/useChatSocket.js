import { useEffect, useState } from "react";
import chatSocket from "../api/chatSocket";
import { useSelector } from "react-redux";

export default function useChatSocket(roomId) {
  const [messages, setMessages] = useState([]);
  const userId = useSelector((state) => state.auth.id);

  useEffect(() => {
    if (!roomId || !userId) return;

    chatSocket.connect(roomId, userId, (msg) => {
      // 중복 메시지 방지 로직 추가 (예: sentAt, senderId 기준)
      setMessages((prev) => {
        // 중복 여부 확인 (보통 sentAt, senderId를 조합)
        if (
          prev.some(
            (m) =>
              m.sentAt === msg.sentAt &&
              m.senderId === msg.senderId &&
              m.message === msg.message
          )
        ) {
          return prev; // 이미 있으면 추가하지 않음
        }
        return [...prev, msg];
      });
    });

    return () => {
      chatSocket.disconnect();
    };
  }, [roomId, userId]);

  const sendMessage = (text) => {
    const message = {
      chatRoomId: Number(roomId),
      senderId: userId,
      messageType: "TEXT",
      message: text,
      sentAt: new Date().toISOString(),
      isRead: false,
    };
    chatSocket.send(message);

    // 낙관적 업데이트(중복 방지 코드가 있으니 그냥 두면 됨)
    setMessages((prev) => [...prev, message]);
  };

  return { messages, sendMessage };
}
