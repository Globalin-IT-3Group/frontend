import { useEffect, useState } from "react";
import chatSocket from "../api/chatSocket";
import { useSelector } from "react-redux";

export default function useChatSocket(roomId) {
  const [messages, setMessages] = useState([]);
  const userId = useSelector((state) => state.auth.id);

  useEffect(() => {
    if (!roomId || !userId) return;

    chatSocket.connect(roomId, userId, (msg) => {
      if (msg.messageType === "READ" && msg.userId && msg.lastReadAt) {
        // 읽음 이벤트라면: 내가 보낸 메시지 && 읽힌 시각 이전 메시지에 isRead를 true로!
        setMessages((prev) =>
          prev.map((m) =>
            m.senderId === userId &&
            new Date(m.sentAt) <= new Date(msg.lastReadAt)
              ? { ...m, isRead: true }
              : m
          )
        );
      } else {
        // 일반 메시지는 중복 방지 후 추가
        setMessages((prev) => {
          if (
            prev.some(
              (m) =>
                m.sentAt === msg.sentAt &&
                m.senderId === msg.senderId &&
                m.message === msg.message
            )
          ) {
            return prev;
          }
          return [...prev, msg];
        });
      }
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
