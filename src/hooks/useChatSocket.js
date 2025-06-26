import { useEffect, useState } from "react";
import chatSocket from "../api/chatSocket";
import { useSelector } from "react-redux";

export default function useChatSocket(roomId) {
  const [messages, setMessages] = useState([]);
  const userId = useSelector((state) => state.auth.id);

  // ✅ 방이 바뀌면 메시지 초기화
  useEffect(() => {
    setMessages([]);
  }, [roomId]);

  // ✅ 실시간 메시지 수신
  useEffect(() => {
    if (!roomId || !userId) return;

    chatSocket.connect(roomId, userId, (msg) => {
      // 읽음 이벤트
      if (msg.messageType === "READ" && msg.userId && msg.lastReadAt) {
        setMessages((prev) =>
          prev.map((m) =>
            m.senderId === userId &&
            new Date(m.sentAt) <= new Date(msg.lastReadAt)
              ? { ...m, isRead: true }
              : m
          )
        );
      } else {
        // ✅ 중복 메시지 방지 (id, 혹은 조합)
        setMessages((prev) => {
          // id로 체크, 없으면 senderId+sentAt+message 조합
          if (
            prev.some(
              (m) =>
                (msg.id && m.id === msg.id) ||
                (!msg.id &&
                  m.senderId === msg.senderId &&
                  m.message === msg.message &&
                  m.sentAt === msg.sentAt)
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

  // ✅ 메시지 보내기 (낙관적 업데이트)
  const sendMessage = (text) => {
    const now = new Date().toISOString();
    const message = {
      chatRoomId: Number(roomId),
      senderId: userId,
      messageType: "TEXT",
      message: text,
      sentAt: now,
      isRead: false,
      // id: uuidv4(), // 선택: 프론트에서 임시 id 부여 (만약 서버도 이 id를 반환하게 하면 완벽히 중복 방지)
    };
    chatSocket.send(message);
    setMessages((prev) => [...prev, message]);
  };

  return { messages, sendMessage };
}
