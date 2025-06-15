import React from "react";
import { AiOutlineClose } from "react-icons/ai";
// 또는: import { RxCross2 } from "react-icons/rx";

export default function ProfileModal({ open, onClose, user, onAddFriend }) {
  if (!open || !user) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xs relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>
        {/* 유저 프로필 */}
        <div className="flex flex-col items-center gap-3">
          <img
            src={
              user.profileImage ||
              "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg"
            }
            alt="profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="text-xl font-bold">{user.nickname}</div>
          <div className="text-gray-500 text-sm min-h-8 text-center break-words">
            {user.profileMessage || "상태 메시지가 없습니다."}
          </div>
        </div>
        {/* 친구 추가 버튼 */}
        <div className="mt-6 flex justify-center">
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition"
            onClick={() => onAddFriend && onAddFriend(user)}
          >
            친구 추가
          </button>
        </div>
      </div>
    </div>
  );
}
