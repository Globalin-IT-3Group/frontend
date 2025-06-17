import React from "react";

export default function StudyRoomListContainer({ children, bgColor }) {
  return (
    <div className="rounded-2xl flex flex-col">
      <div className={`w-[255px] h-[370px] p-3 flex justify-center ${bgColor}`}>
        {React.cloneElement(children, {
          className: "w-[260px] h-[260px] object-cover",
        })}
      </div>
      <div className="text-black font-medium text-sm ">아</div>
    </div>
  );
}
