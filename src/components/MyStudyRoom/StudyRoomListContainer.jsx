import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

export default function StudyRoomListContainer({
  children,
  bgColor,
  label,
  onClose,
  isLeader,
}) {
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
        <Link to="/study/mystudyroom">
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
