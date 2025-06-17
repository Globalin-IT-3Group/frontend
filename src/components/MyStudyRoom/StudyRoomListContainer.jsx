import React from "react";

export default function StudyRoomListContainer({ children, bgColor }) {
  return (
    <div className="rounded-2xl flex flex-col items-center">
      <div className={`w-[255px] h-[370px] p-3 flex flex-col justify-center items-center ${bgColor}`}>
        {React.cloneElement(children, {
          className: `${children.props.className ?? ""} w-[260px] h-[260px] object-cover`,
        })}
        <div className="text-black font-medium text-sm mt-3">아</div> {/* ✅ 배경 안에 포함됨 */}
      </div>
    </div>
  );
}
