import { useEffect, useRef } from "react";
import StudyChatMessageItem from "./StudyChatMessageItem";

export default function StudyChatMessageList({
  messages,
  userId,
  onReachBottom,
}) {
  const listRef = useRef(null);
  const endRef = useRef(null);

  // "내가 보낸 메시지가 추가될 때만" 아래로 스크롤
  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].senderId === userId &&
      endRef.current
    ) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, userId]);

  // 스크롤이 맨 아래로 내려갔는지 감지
  const handleScroll = () => {
    const list = listRef.current;
    if (!list) return;
    const isAtBottom =
      Math.abs(list.scrollHeight - list.scrollTop - list.clientHeight) < 2;
    if (isAtBottom && typeof onReachBottom === "function") {
      onReachBottom();
    }
  };

  // 새 메시지가 오면 handleScroll 실행
  useEffect(() => {
    handleScroll();
    // eslint-disable-next-line
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto mb-2 pr-2" ref={listRef}>
      {messages.map((msg, idx) => {
        const key =
          msg.messageType === "READ"
            ? `read_${msg.messageId}_${msg.lastReadAt || idx}`
            : msg.id ?? `${msg.senderId}_${msg.sentAt ?? idx}`;

        return (
          <StudyChatMessageItem key={key} message={msg} myUserId={userId} />
        );
      })}
      <div ref={endRef} />
    </div>
  );
}
