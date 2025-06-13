import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import userAPI from "../../api/userAPI";

export default function Password({ initPassword }) {
  const [password, setPassword] = useState(initPassword || "");
  const [confirmPassword, setConfirmPassword] = useState(initPassword || "");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // 비밀번호 일치 여부 체크 함수
  const validate = (pwd, confirm) => {
    if (!pwd && !confirm) {
      setPasswordMatchMessage("");
      setIsPasswordMatch(null);
    } else if (!pwd || !confirm || pwd !== confirm) {
      setPasswordMatchMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordMatch(false);
    } else {
      setPasswordMatchMessage("비밀번호가 일치합니다.");
      setIsPasswordMatch(true);
    }
  };

  // 비밀번호 입력 시
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validate(value, confirmPassword);
  };

  // 비밀번호 확인 입력 시
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validate(password, value);
  };

  // 비밀번호 변경 버튼 클릭
  const handlePasswordUpdate = async () => {
    if (!password || !confirmPassword) {
      setPasswordMatchMessage("비밀번호를 입력해주세요.");
      setIsPasswordMatch(false);
      return;
    }
    if (password !== confirmPassword) {
      setPasswordMatchMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordMatch(false);
      return;
    }

    try {
      setLoading(true);
      await userAPI.updatePassword(password);
      setPasswordMatchMessage("비밀번호가 성공적으로 변경되었습니다!");
      setIsPasswordMatch(true);
      setPassword("");
      setConfirmPassword("");
    } catch (e) {
      setPasswordMatchMessage(
        e?.response?.data?.message || "비밀번호 변경에 실패했습니다."
      );
      setIsPasswordMatch(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* 비밀번호 입력 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-8 relative">
          <label className="w-[180px] text-xl font-bold">비밀번호</label>
          <div className="relative w-68">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className="w-68 px-4 py-2 text-lg border border-gray-300 rounded-xl"
              placeholder="새 비밀번호"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <button
          className="min-w-[72px] px-4 py-3 bg-[#003CFF] text-white rounded-2xl font-bold hover:bg-[#0536D7] transition"
          onClick={handlePasswordUpdate}
          disabled={!isPasswordMatch || loading}
        >
          {loading ? "변경 중..." : "변경"}
        </button>
      </div>

      {/* 비밀번호 확인 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-8">
          <label className="w-[180px] text-xl font-bold">비밀번호 확인</label>
          <div className="relative w-68">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="flex px-4 py-2 text-lg border border-gray-300 rounded-xl w-68"
              placeholder="비밀번호 확인"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {passwordMatchMessage && (
            <div
              className={`flex whitespace-nowrap ${
                isPasswordMatch ? "text-green-500" : "text-red-500"
              }`}
            >
              {passwordMatchMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
