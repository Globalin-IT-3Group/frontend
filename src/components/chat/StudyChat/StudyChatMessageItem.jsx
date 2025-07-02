import dayjs from "dayjs";
import "dayjs/locale/ko";

export default function StudyChatMessageItem({ message, myUserId }) {
  const isMine = message.senderId === myUserId;
  const sentAtDisplay = message.sentAt
    ? dayjs(message.sentAt).locale("ko").format("A hh:mm")
    : "";

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"} mb-2`}>
      {!isMine && (
        <img
          src={message.senderProfileImage || "/default.png"}
          alt={message.senderNickname}
          className="w-8 h-8 rounded-full mr-2"
        />
      )}

      <div
        className={`flex items-end ${isMine ? "flex-row-reverse" : "flex-row"}`}
      >
        {/* 말풍선 */}
        <div
          className={`rounded-2xl px-4 py-2 max-w-[300px] ${
            isMine
              ? "bg-blue-100 text-right ml-1"
              : "bg-gray-200 dark:bg-zinc-600 text-left mr-1"
          }`}
        >
          {!isMine && (
            <div className="text-base font-bold text-gray-700 dark:text-white mb-1">
              {message.senderNickname}
            </div>
          )}
          <div className="text-left dark:text-gray-200">
            <span>{message.message}</span>
          </div>
          <span
            className={
              `text-[11px] text-gray-400 dark:text-gray-400 text-right mt-1` +
              (isMine ? "text-right" : "text-left")
            }
          >
            {sentAtDisplay}
          </span>
        </div>
        {/* 미확인 n명 뱃지 (말풍선 "옆", 수평 배치) */}
        {message.unreadCount > 0 && (
          <span
            className={`
              text-xs font-bold h-fit
              text-yellow-400
            `}
            style={{
              minWidth: 20,
              textAlign: "center",
            }}
          >
            {message.unreadCount}
          </span>
        )}
      </div>
    </div>
  );
}
