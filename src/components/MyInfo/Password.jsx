import { useState } from "react";

export default function Password() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(null);

  return (
    <div className="flex flex-col gap-10">
      {/* 비밀번호 입력 + 변경 버튼 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-8 relative">
          <label className="w-[180px] text-xl font-bold">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);

              if (!value && !confirmPassword) {
                setPasswordMatchMessage("");
                setIsPasswordMatch(null);
              } else if (!value || !confirmPassword) {
                setPasswordMatchMessage("비밀번호가 일치하지 않습니다.");
                setIsPasswordMatch(false);
              } else if (value !== confirmPassword) {
                setPasswordMatchMessage("비밀번호가 일치하지 않습니다.");
                setIsPasswordMatch(false);
              } else {
                setPasswordMatchMessage("비밀번호가 일치합니다.");
                setIsPasswordMatch(true);
              }
            }}
            className="w-68 px-4 py-2 text-lg border border-gray-300 rounded-xl"
            defaultValue="********"
          />
        </div>
        <button className="min-w-[72px] px-4 py-3 bg-[#003CFF] text-white rounded-2xl font-bold hover:bg-[#0536D7] transition">
          변경
        </button>
      </div>

      {/* 비밀번호 확인 */}
      <div className="flex items-center gap-8">
        <label className="w-[180px] text-xl font-bold">비밀번호 확인</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            const value = e.target.value;
            setConfirmPassword(value);

            if (!password && !value) {
              setPasswordMatchMessage("");
              setIsPasswordMatch(null);
            } else if (!password || !value) {
              setPasswordMatchMessage("비밀번호가 일치하지 않습니다.");
              setIsPasswordMatch(false);
            } else if (value !== password) {
              setPasswordMatchMessage("비밀번호가 일치하지 않습니다.");
              setIsPasswordMatch(false);
            } else {
              setPasswordMatchMessage("비밀번호가 일치합니다.");
              setIsPasswordMatch(true);
            }
          }}
          className="flex px-4 py-2 text-lg border border-gray-300 rounded-xl w-68"
          defaultValue="********"
        />
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
  );
}
