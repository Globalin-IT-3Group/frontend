import { FiEdit2 } from "react-icons/fi";
import { useState } from "react";
import userAPI from "../../api/userAPI";
import { updateProfileMessage } from "../../store/reducers/authSlice";
import { useDispatch } from "react-redux";

export default function StatusMessage({ initialMessage }) {
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(
    initialMessage || "まだメッセージがありません！"
  );
  const [tempMessage, setTempMessage] = useState(message);
  const dispatch = useDispatch();

  const handleSave = async () => {
    try {
      await userAPI.updateProfileMessage(tempMessage); // ✅ API 호출
      setMessage(tempMessage);
      dispatch(updateProfileMessage(tempMessage));
      setIsEditing(false);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const handleCancel = () => {
    setTempMessage(message);
    setIsEditing(false);
  };

  return (
    <div className="relative bg-white border border-gray-300 rounded-xl px-4 py-2 text-center shadow-[0_0_4px_rgba(0,0,0,0.1)] mt-6 flex items-center justify-center gap-2 w-[500px]">
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
            className="text-sm px-3 py-1 rounded-md bg-[#003CFF] text-white hover:bg-[#0536D7] transition-all duration-100"
          >
            변경
          </button>
          <button
            onClick={handleCancel}
            className="text-sm px-3 py-1 rounded-md bg-white text-gray-400 border border-gray-400 hover:bg-gray-200"
          >
            취소
          </button>
        </>
      ) : (
        <>
          <p className="text-gray-700 text-lg flex-1 break-words">{message}</p>
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
