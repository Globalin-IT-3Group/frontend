import { useEffect, useRef } from "react";
import StudyChatMessageItem from "./StudyChatMessageItem";

export default function StudyChatMessageList({
  messages,
  userId,
  onReachBottom,
}) {
  const listRef = useRef(null);
  const endRef = useRef(null);

  // 새 메시지가 올 때마다 아래로 스크롤
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // 스크롤이 맨 아래로 내려갔는지 감지
  const handleScroll = () => {
    const list = listRef.current;
    if (!list) return;
    // 브라우저 렌더링 특성상 미세 오차 있을 수 있어서 2px 이하 오차 허용
    const isAtBottom =
      Math.abs(list.scrollHeight - list.scrollTop - list.clientHeight) < 2;
    if (isAtBottom && typeof onReachBottom === "function") {
      onReachBottom();
    }
  };

  // 새 메시지가 오면 자동으로 맨 아래로 스크롤이 이동하기 때문에,
  // 이때 handleScroll도 한 번 실행해서 읽음 처리를 자동화 가능!
  useEffect(() => {
    handleScroll();
    // eslint-disable-next-line
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto mb-2 pr-2"
      ref={listRef}
      onScroll={handleScroll}
    >
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
