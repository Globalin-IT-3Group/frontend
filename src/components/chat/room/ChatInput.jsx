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
    <div className="flex mt-4 border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="flex-1 p-2 rounded-l border border-gray-300 dark:bg-zinc-700 dark:text-white"
        placeholder="메시지를 입력하세요..."
      />
      <button
        onClick={onSend}
        className="bg-blue-500 text-white px-4 rounded-r"
        tabIndex={-1}
      >
        <LuSendHorizontal />
      </button>
    </div>
  );
}
