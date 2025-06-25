import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function StudyRoomRuleSkeleton() {
  return (
    <div className="w-full h-[255px] rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col p-6">
        <div className="flex items-center gap-x-4 mb-3">
          <span className="inline-flex items-center justify-center bg-yellow-100 rounded-full p-2 text-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] ">
            📢
          </span>
          <span className="text-xl font-bold">스터디방 규칙</span>
        </div>
        <div className="ml-16 gap-4">
          <Skeleton width={200} height={25} />
          <Skeleton width={200} height={25} />
          <Skeleton width={200} height={25} />
        </div>
      </div>
    </div>
  );
}
