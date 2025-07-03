export default function StudyChatMessageItem({ message, myUserId, showDate }) {
  const isMine = message.senderId === myUserId;

  function formatTime(isoString) {
    const clean = isoString.replace(/Z$/, "");
    const d = new Date(clean);
    const h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, "0");
    const ampm = h < 12 ? "오전" : "오후";
    const h12 = h % 12 || 12;
    return `${ampm} ${h12}:${m}`;
  }

  function formatDate(isoString) {
    const clean = isoString.replace(/Z$/, "");
    const date = new Date(clean);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  }

  return (
    <>
      {showDate && (
        <div className="flex justify-center mb-2">
          <span className="bg-gray-300 text-gray-600 px-4 py-2 rounded-full text-xs mb-6">
            {formatDate(message.sentAt)}
          </span>
        </div>
      )}
      <div className={`flex ${isMine ? "justify-end" : "justify-start"} mb-2`}>
        {!isMine && (
          <img
            src={message.senderProfileImage || "/default.png"}
            alt={message.senderNickname}
            className="w-8 h-8 rounded-full mr-2"
          />
        )}

        <div
          className={`flex items-end ${
            isMine ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {/* 말풍선 */}
          <div
            className={`rounded-2xl px-4 py-2 max-w-[300px] text-sm ${
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
            <div
              className={`text-left break-words  ${
                isMine ? "dark:text-gray-600" : "dark:text-white"
              }`}
            >
              <span>{message.message}</span>
            </div>
            <span
              className={
                `text-[11px] text-gray-400 dark:text-gray-400 text-right mt-1` +
                (isMine ? "text-right" : "text-left")
              }
            >
              {formatTime(message.sentAt)}
            </span>
          </div>

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
    </>
  );
}
