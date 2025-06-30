import { useEffect, useState, useRef } from "react";
import ChatMessageApi from "../api/chatMessageAPI";
import studyChatSocket from "../api/studyChatSocket";
import { useSelector } from "react-redux";

export default function useGroupChatSocket(roomId) {
  const [messages, setMessages] = useState([]);
  const userId = useSelector((state) => state.auth.id);
  const initializedRef = useRef(false);
  const lastReadMsgIdRef = useRef(null);

  // 1. 최초 입장시 메시지 목록 불러오기
  useEffect(() => {
    setMessages([]);
    initializedRef.current = false;
    if (!roomId) return;

    const fetchMessages = async () => {
      const data = await ChatMessageApi.getGroupMessagesByRoomId(roomId);
      setMessages(data || []);
      initializedRef.current = true;
    };
    fetchMessages();
  }, [roomId]);

  // 2. 실시간 메시지 수신
  useEffect(() => {
    if (!roomId || !userId) return;

    studyChatSocket.connect(roomId, userId, (msg) => {
      if (msg.messageType === "READ" && msg.unreadCounts) {
        setMessages((prev) =>
          prev.map((m) =>
            msg.unreadCounts[m.id] !== undefined
              ? { ...m, unreadCount: msg.unreadCounts[m.id] }
              : m
          )
        );
      }

      // 일반 메시지(중복방지)
      else if (msg.id) {
        setMessages((prev) => {
          // 같은 id가 있으면 추가 안 함
          if (prev.some((m) => m.id === msg.id)) return prev;
          return [...prev, msg];
        });
      }
    });

    return () => {
      studyChatSocket.disconnect();
    };
  }, [roomId, userId]);

  // 3. 메시지 전송 (서버 브로드캐스트만 신뢰)
  const sendMessage = (text) => {
    if (!text.trim()) return;
    const now = new Date().toISOString();
    const payload = {
      chatRoomId: Number(roomId),
      senderId: userId,
      messageType: "TEXT",
      message: text,
      sentAt: now,
    };
    studyChatSocket.send(payload);
    // 브로드캐스트 받을 때만 배열에 추가 (optimistic UI가 필요하다면 여기에 추가)
  };

  // 4. 읽음 이벤트 (방 입장·메시지 변화시)
  const markAsRead = async () => {
    if (!roomId || messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];
    if (!lastMsg?.id) return;

    // 이미 읽음 표시를 보냈으면 중복 호출 X
    if (lastReadMsgIdRef.current === lastMsg.id) return;
    lastReadMsgIdRef.current = lastMsg.id;

    await ChatMessageApi.markAsRead(roomId, lastMsg.sentAt);

    const readPayload = {
      chatRoomId: Number(roomId),
      senderId: userId,
      messageType: "READ",
      lastReadAt: lastMsg.sentAt,
      messageId: lastMsg.id,
    };
    studyChatSocket.send(readPayload);
  };

  return { messages, sendMessage, markAsRead };
}
