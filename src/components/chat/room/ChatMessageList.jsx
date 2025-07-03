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
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-zinc-800 text-gray-400 text-lg select-none min-h-[570px] max-h-[570px] shadow-lg rounded-xl">
        채팅을 시작해주세요!
      </div>
    );
  }

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
        flex-1 rounded-xl shadow-[0_0_6px_rgba(0,0,0,0.1)]
        overflow-y-auto px-4 py-4
        space-y-2 bg-gray-50 dark:bg-zinc-800
        min-h-[570px] max-h-[570px]
      "
    >
      {messages.map((msg, idx) => {
        const uniqueKey = msg.id
          ? `msg_${msg.id}`
          : `${msg.senderId}_${msg.sentAt}_${idx}`;
        const isMe = msg.senderId === userId;
        const showDate =
          idx === 0 ||
          formatDate(messages[idx - 1].sentAt) !== formatDate(msg.sentAt);

        return (
          <div key={uniqueKey}>
            {/* 1️⃣ 날짜 라벨 */}
            {showDate && (
              <div className="flex justify-center mb-6">
                <span className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full text-xs mb-4">
                  {formatDate(msg.sentAt)}
                </span>
              </div>
            )}

            <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`relative flex flex-col ${
                  isMe ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 max-w-[300px] text-sm ${
                    isMe
                      ? "bg-blue-100 text-right ml-1"
                      : "bg-gray-200 dark:bg-zinc-600 text-left mr-1"
                  }`}
                >
                  {!isMe && (
                    <div className="text-base font-bold text-gray-700 dark:text-white mb-1">
                      {msg.senderNickname}
                    </div>
                  )}

                  <div
                    className={`
                    ${
                      isMe
                        ? "text-right dark:text-gray-600"
                        : "text-left dark:text-white"
                    }
                    break-words `}
                  >
                    {msg.message}
                  </div>

                  <span
                    className={`text-[11px] text-gray-400 dark:text-gray-400 mt-1 ${
                      isMe ? "text-right" : "text-left"
                    }`}
                  >
                    {formatTime(msg.sentAt)}
                  </span>
                </div>

                {isMe && msg.isRead === false && (
                  <div className="absolute -left-4 bottom-0 flex flex-col justify-end mr-2 h-full">
                    <span className="text-xs text-yellow-600 mb-0.5">1</span>
                  </div>
                )}
              </div>
            </div>

            <div ref={endRef} />
          </div>
        );
      })}{" "}
    </div>
  );
}
