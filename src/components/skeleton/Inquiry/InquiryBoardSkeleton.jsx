import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function InquiryBoardSkeleton() {
  return (
    <div className="rounded-2xl mb-2 overflow-hidden shadow-xs p-2">
      <div className="px-4 py-4 bg-white ">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-3">
            <Skeleton width={80} height={30} />
            <Skeleton width={70} height={20} />
          </div>
          <Skeleton width={60} height={20} />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton circle width={28} height={28} />
          <Skeleton width={60} height={16} />
        </div>
      </div>
    </div>
  );
}
