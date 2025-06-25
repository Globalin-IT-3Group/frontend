import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function MemberProfileSkeleton() {
  return (
    <div className="flex w-full flex-col gap-4 relative w-fit">
      {/* 방장 스켈레톤 */}
      <div className="flex h-[120px] bg-blue-50 rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.05)]">
        <div className="w-1/2 flex items-center justify-center p-4 gap-4">
          <div className="relative ml-4">
            {/* <span className="absolute -left-8 -top-3">
              <Skeleton circle width={24} height={24} />
            </span> */}
            <Skeleton circle width={72} height={72} />
          </div>
          <div className="flex flex-col justify-center">
            <Skeleton width={80} height={20} />
          </div>
        </div>
        <div className="absolute right-4 top-4">
          <Skeleton width={100} height={36} />
        </div>
      </div>

      {/* 멤버 스켈레톤 */}
      <div className="relative w-full">
        <div className="flex items-center justify-center gap-x-10 h-[120px] bg-gray-50 rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.05)]">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <Skeleton circle width={56} height={56} />
              <Skeleton width={60} height={14} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
