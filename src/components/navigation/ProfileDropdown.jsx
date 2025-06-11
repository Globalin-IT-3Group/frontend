import { useState, useRef, useEffect } from "react";

export default function ProfileDropdown({ avatar, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // 바깥 클릭 시 드롭다운 닫힘 처리
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      {/* 프로필(아바타) 버튼 */}
      <button type="button" onClick={() => setIsOpen((v) => !v)}>
        {avatar}
      </button>
      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-50 bg-white dark:bg-zinc-900 rounded-lg shadow-lg py-2 z-50 animate-fadeIn">
          {typeof children === "function"
            ? children(() => setIsOpen(false)) // 콜백으로 닫기 기능 제공
            : children}
        </div>
      )}
    </div>
  );
}
