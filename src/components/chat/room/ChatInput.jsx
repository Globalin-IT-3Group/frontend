import { LuSendHorizontal } from "react-icons/lu";

export default function ChatInput({ input, onChange, onSend }) {
  const handleInputChange = (e) => onChange(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex gap-2 mt-2">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="flex-1 border border-gray-300 rounded-xl px-3 py-2 dark:border-white dark:text-white"
        placeholder="메시지를 입력하세요..."
      />
      <button
        onClick={onSend}
        className="px-4 py-2 rounded-xl bg-[#0033CF] text-white whitespace-nowrap hover:bg-blue-500 cursor-pointer"
        tabIndex={-1}
      >
        전송
      </button>
    </div>
  );
}
