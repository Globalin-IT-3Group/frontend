import { FiEdit2 } from "react-icons/fi";
import { useState } from "react";

export default function StatusMessage() {
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("今日も頑張りましょう！");
  const [tempMessage, setTempMessage] = useState(message);

  const handleSave = () => {
    setMessage(tempMessage);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempMessage(message);
    setIsEditing(false);
  };

  const handleBlur = () => setIsEditing(false);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <div className="relative bg-white border border-gray-300 rounded-xl px-4 py-2 text-center shadow-[0_0_4px_rgba(0,0,0,0.1)] mt-6 flex items-center justify-center gap-2">
      {isEditing ? (
        <>
          <input
            type="text"
            value={tempMessage}
            onChange={(e) => setTempMessage(e.target.value)}
            className="focus:outline-none text-lg flex-1"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="text-sm px-3 py-1 rounded-md bg-[#5500ff] text-white hover:bg-[#4600D1] transition-all duration-100"
          >
            변경
          </button>
          <button
            onClick={handleCancel}
            className="text-sm px-3 py-1 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400"
          >
            취소
          </button>
        </>
      ) : (
        <>
          <p className="text-gray-700 text-lg flex-1">{message}</p>
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiEdit2 />
          </button>
        </>
      )}
    </div>
  );
}
