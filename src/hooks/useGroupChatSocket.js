import { useEffect, useState, useRef } from "react";
import ChatMessageApi from "../api/chatMessageAPI";
import studyChatSocket from "../api/studyChatSocket";
import { useSelector } from "react-redux";
import ChatRoomApi from "../api/chatRoomAPI";

/**
 * studyRoomId(프론트 param) => 내부에서 chatRoomId(PK)로 변환 → 이후 모든 소켓, 메시지 로직은 chatRoomId 기준
 */
export default function useGroupChatSocket(studyRoomId) {
  const [messages, setMessages] = useState([]);
  const userId = useSelector((state) => state.auth.id);
  const initializedRef = useRef(false);
  const lastReadMsgIdRef = useRef(null);
  const [chatRoomId, setChatRoomId] = useState(null);

  // 0. 스터디룸ID → 그룹채팅방 PK(chatRoomId)로 변환
  useEffect(() => {
    setChatRoomId(null);
    setMessages([]);
    initializedRef.current = false;

    if (!studyRoomId) return;

    ChatRoomApi.getGroupChatRoomIdByStudyRoomId(studyRoomId)
      .then((id) => {
        setChatRoomId(id);
      })
      .catch(() => setChatRoomId(null));
  }, [studyRoomId]);

  // 1. chatRoomId 준비되면 메시지 불러오기
  useEffect(() => {
    setMessages([]);
    initializedRef.current = false;
    if (!chatRoomId) return;

    const fetchMessages = async () => {
      const data = await ChatMessageApi.getGroupMessagesByRoomId(chatRoomId);
      setMessages(data || []);
      initializedRef.current = true;
    };
    fetchMessages();
  }, [chatRoomId]);

  // 2. 실시간 메시지 수신 (chatRoomId 기반으로!)
  useEffect(() => {
    if (!chatRoomId || !userId) return;

    studyChatSocket.connect(chatRoomId, userId, (msg) => {
      if (msg.messageType === "READ" && msg.unreadCounts) {
        setMessages((prev) =>
          prev.map((m) =>
            msg.unreadCounts[m.id] !== undefined
              ? { ...m, unreadCount: msg.unreadCounts[m.id] }
              : m
          )
        );
      } else if (msg.id) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === msg.id)) return prev;
          return [...prev, msg];
        });
      }
    });

    return () => {
      studyChatSocket.disconnect();
    };
  }, [chatRoomId, userId]);

  // 3. 메시지 전송 (chatRoomId로)
  const sendMessage = (text) => {
    if (!text.trim() || !chatRoomId) return;
    const now = new Date().toISOString();
    const payload = {
      chatRoomId: Number(chatRoomId),
      senderId: userId,
      messageType: "TEXT",
      message: text,
      sentAt: now,
    };
    studyChatSocket.send(payload);
  };

  // 4. 읽음 이벤트
  const markAsRead = async () => {
    if (!chatRoomId || messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];
    if (!lastMsg?.id) return;

    if (lastReadMsgIdRef.current === lastMsg.id) return;
    lastReadMsgIdRef.current = lastMsg.id;

    await ChatMessageApi.markAsRead(chatRoomId, lastMsg.sentAt);

    const readPayload = {
      chatRoomId: Number(chatRoomId),
      senderId: userId,
      messageType: "READ",
      lastReadAt: lastMsg.sentAt,
      messageId: lastMsg.id,
    };
    studyChatSocket.send(readPayload);
  };

  return { messages, sendMessage, markAsRead, chatRoomId };
}
