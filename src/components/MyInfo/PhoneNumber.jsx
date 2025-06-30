import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function PhoneNumber({ phoneNumber }) {
  // 전화번호(예: 010-1234-5678)
  const [realPhoneNumber] = useState(phoneNumber || "010-1234-5678");
  const [show, setShow] = useState(false);

  // +82와 10-****-**** 포맷 변환 함수
  const getDisplayNumber = () => {
    if (!realPhoneNumber) return "";
    if (show) {
      // 숫자만 남기기
      const digits = realPhoneNumber.replace(/\D/g, "");
      if (!digits.startsWith("010")) return digits;
      const rest = digits.slice(3);
      if (rest.length === 0) return "10";
      // 홀수일 땐 앞에 더 많이
      const half = Math.ceil(rest.length / 2);
      const first = rest.slice(0, half);
      const second = rest.slice(half);
      // "10-앞-뒤" 형태로
      return `10-${first}${second ? `-${second}` : ""}`;
    } else {
      return "10-****-****";
    }
  };

  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-8 flex-wrap sm:flex-nowrap">
        <label className="w-full sm:w-[180px] text-base sm:text-lg md:text-xl font-bold whitespace-nowrap">
          전화번호
        </label>
        <div className="flex items-center gap-2 flex-1">
          <span className="text-base sm:text-lg font-semibold">+82</span>
          <input
            type="text"
            className="flex px-2 py-2 text-base sm:text-lg w-34"
            value={getDisplayNumber()}
            readOnly
          />
          <button
            type="button"
            className="ml-2 text-gray-500"
            onClick={() => setShow((prev) => !prev)}
            tabIndex={-1}
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
