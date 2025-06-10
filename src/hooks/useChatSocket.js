import { useEffect, useState } from "react";
import chatSocket from "../api/chatSocket";
import { useSelector } from "react-redux";

export default function useChatSocket(roomId) {
  const [messages, setMessages] = useState([]);
  const userId = useSelector((state) => state.auth.id);

  useEffect(() => {
    if (!roomId || !userId) return;

    chatSocket.connect(roomId, userId, (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      chatSocket.disconnect();
    };
  }, [roomId, userId]);

  const sendMessage = (text) => {
    const message = {
      chatRoomId: Number(roomId),
      senderId: userId,
      messageType: "TALK",
      message: text,
      sentAt: new Date().toISOString(),
    };
    chatSocket.send(message);
    setMessages((prev) => [...prev, message]); // 낙관적 업데이트
  };

  return { messages, sendMessage };
}
