import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Password() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-8 relative">
          <label className="w-[180px] text-xl font-bold">비밀번호</label>
          <div className="relative w-68">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);

                if (!value && !confirmPassword) {
                  setPasswordMatchMessage("");
                  setIsPasswordMatch(null);
                } else if (
                  !value ||
                  !confirmPassword ||
                  value !== confirmPassword
                ) {
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
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <button className="min-w-[72px] px-4 py-3 bg-[#003CFF] text-white rounded-2xl font-bold hover:bg-[#0536D7] transition">
          변경
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-8">
          <label className="w-[180px] text-xl font-bold">비밀번호 확인</label>
          <div className="relative w-68">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                const value = e.target.value;
                setConfirmPassword(value);

                if (!password && !value) {
                  setPasswordMatchMessage("");
                  setIsPasswordMatch(null);
                } else if (!password || !value || value !== password) {
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
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
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
