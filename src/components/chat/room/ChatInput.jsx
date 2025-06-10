export default function ChatInput({ input, onChange, onSend }) {
  const handleInputChange = (e) => onChange(e.target.value);

  return (
    <div className="flex p-2 border-t border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        className="flex-1 p-2 rounded-l border border-gray-300 dark:bg-zinc-700 dark:text-white"
        placeholder="메시지를 입력하세요..."
      />
      <button
        onClick={onSend}
        className="bg-blue-500 text-white px-4 rounded-r"
      >
        보내기
      </button>
    </div>
  );
}
