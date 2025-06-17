import { useRef, useEffect } from "react";

export default function ChatMessageList({ messages, userId }) {
  const endRef = useRef(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-zinc-900 text-gray-400 text-lg select-none min-h-[360px] max-h-[420px]">
        채팅을 시작해주세요!
      </div>
    );
  }

  // 시간 포맷 함수
  function formatTime(isoString) {
    const date = new Date(isoString);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const isAM = hours < 12;
    const h12 = hours % 12 === 0 ? 12 : hours % 12;
    return `${isAM ? "오전" : "오후"} ${h12}:${minutes}`;
  }

  function formatDate(isoString) {
    const date = new Date(isoString);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  }

  return (
    <div
      className="
        flex-1 rounded-xl shadow-lg
        overflow-y-auto px-4 py-4
        space-y-2 bg-gray-50 dark:bg-zinc-900
        min-h-[670px] max-h-[420px]
        "
    >
      {messages.map((msg, idx) => {
        const isMe = msg.senderId === userId;
        const showDate =
          idx === 0 ||
          formatDate(messages[idx - 1].sentAt) !== formatDate(msg.sentAt);

        return (
          <div key={msg.id || idx}>
            {/* 날짜 라벨: 날짜가 달라지면 표시 */}
            {showDate && (
              <div className="flex justify-center mb-6">
                <span className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full text-xs">
                  {formatDate(msg.sentAt)}
                </span>
              </div>
            )}

            {/* 기존 메시지 렌더링 */}
            <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div className="relative flex flex-col items-end">
                <div
                  className={`flex ${
                    isMe ? "justify-end" : "justify-start"
                  } items-end`}
                >
                  {isMe && msg.isRead === false && (
                    <div className="flex flex-col justify-end mr-2 h-full">
                      <span className="text-xs text-yellow-600 mb-0.5">1</span>
                    </div>
                  )}
                  <div
                    className={`
                max-w-xs px-3 py-2 rounded-lg text-sm
                ${
                  isMe
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-zinc-700 dark:text-white"
                }
              `}
                  >
                    {msg.message}
                  </div>
                </div>

                {msg.message && msg.sentAt && (
                  <div
                    className={`text-xs text-gray-400 mt-1 w-full ${
                      isMe ? "text-right" : "text-left"
                    }`}
                  >
                    {formatTime(msg.sentAt)}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <div ref={endRef} />
    </div>
  );
}
