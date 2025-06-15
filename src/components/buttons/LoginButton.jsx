import { useState } from "react";
import LoginModal from "../Login/LoginModal";

export default function LoginButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 bg-white shadow-sm text-gray-500 border border-gray-500 rounded-xl cursor-pointer"
      >
        로그인
      </button>
      {isOpen && <LoginModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
