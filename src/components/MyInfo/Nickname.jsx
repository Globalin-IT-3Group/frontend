import { useState } from "react";
import userAPI from "../../api/userAPI";
import { updateNickname } from "../../store/reducers/authSlice";
import { useDispatch } from "react-redux";

export default function Nickname({ nickname }) {
  const [inputValue, setInputValue] = useState(nickname || "");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // 닉네임 변경
  const handleUpdate = async () => {
    if (!inputValue.trim()) {
      setMessage("닉네임을 입력하세요.");
      setIsSuccess(false);
      return;
    }
    try {
      setLoading(true);
      await userAPI.updateNickname(inputValue);
      setMessage("닉네임이 성공적으로 변경되었습니다!");
      setIsSuccess(true);
      dispatch(updateNickname(inputValue));
    } catch (error) {
      const msg =
        error?.response?.data?.message || "닉네임 변경에 실패했습니다.";
      setMessage(msg);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-8">
        <label className="w-full sm:w-[180px] text-base sm:text-lg md:text-xl font-bold whitespace-nowrap">
          별명
        </label>
        <input
          type="text"
          className="w-full min-w-24 max-w-68 px-4 py-2 text-base sm:text-lg border border-gray-300 rounded-xl"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setMessage("");
            setIsSuccess(null);
          }}
        />
      </div>
      <button
        className="min-w-[72px] px-4 py-3 bg-[#003CFF] text-white rounded-2xl font-bold hover:bg-[#0536D7] transition disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
        onClick={handleUpdate}
        disabled={loading || inputValue.trim() === ""}
      >
        {loading ? "변경 중..." : "변경"}
      </button>
      {message && (
        <div
          className={`ml-4 whitespace-nowrap ${
            isSuccess ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
