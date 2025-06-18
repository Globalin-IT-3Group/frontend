import React from "react";
import { Link } from "react-router-dom";

export default function StudyRoomListContainer({
  children,
  bgColor,
  label,
  onClose,
}) {
  return (
    <div className="rounded-2xl flex flex-col items-center">
      <div
        className={`w-[258px] h-[370px] p-3 flex flex-col items-center ${bgColor}`}
      >
        {React.cloneElement(children, {
          className: `${
            children.props.className ?? ""
          } w-[260px] h-[260px] shadow-md  object-cover`,
        })}
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
