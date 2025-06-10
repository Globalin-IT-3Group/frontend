export default function ChatMessageList({ messages, userId }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-gray-50 dark:bg-zinc-900">
      {messages.map((msg, idx) => {
        const isMe = msg.senderId === userId;
        return (
          <div
            key={idx}
            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                isMe
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-zinc-700 dark:text-white"
              }`}
            >
              {msg.message}
            </div>
          </div>
        );
      })}
    </div>
  );
}
