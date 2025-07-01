import { useState } from "react";
export default function StudyChatInputForm({ onSend }) {
  const [text, setText] = useState("");
  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };
  return (
    <div className="flex gap-2 mt-2">
      <input
        className="flex-1 border rounded-xl px-3 py-2 dark:border-white dark:text-white"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="메시지 입력..."
      />
      <button
        className="px-4 py-2 rounded-xl bg-blue-400 text-white"
        onClick={handleSend}
      >
        전송
      </button>
    </div>
  );
}
