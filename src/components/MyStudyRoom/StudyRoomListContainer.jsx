import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

export default function StudyRoomListContainer({
  children,
  bgColor,
  label,
  onClose,
  isLeader,
  id,
  isEmpty,
}) {
  if (isEmpty) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center h-[370px] w-[259px] rounded-2xl bg-gradient-to-b from-gray-200 to-white p-3">
          {children}
          <div className="text-gray-500 text-lg mt-6">{label}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl flex flex-col items-center">
      <div
        className={`w-[259px] h-[370px] p-3 flex flex-col items-center ${bgColor}`}
      >
        <div className="relative">
          {React.cloneElement(children, {
            className: `${
              children.props.className ?? ""
            } w-[260px] h-[260px] shadow-md object-cover`,
          })}
          {/* ⭐ 방장일 때만 별 표시 */}
          {isLeader && (
            <span className="absolute left-3 top-3 bg-white/70 rounded-full p-1 text-yellow-400 text-xl shadow">
              <FaStar />
            </span>
          )}
        </div>
        <div className="text-black font-medium text-sm mt-3">{label}</div>
        <Link to={`/study/mystudyroom/${id}`}>
          <button
            onClick={onClose}
            className="cursor-pointer mt-6 text-sm bg-black text-white rounded-2xl px-3 py-1"
          >
            들어가기
          </button>
        </Link>
      </div>
    </div>
  );
}
