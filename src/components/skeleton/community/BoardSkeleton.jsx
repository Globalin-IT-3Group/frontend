import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BoardSkeleton() {
  return (
    <li className="list-none shadow-md px-4 py-4 bg-white rounded-xl mb-5">
      {/* 제목, 날짜 */}
      <div className="flex items-center mb-2">
        <Skeleton width={50} height={28} />
        <div className="ml-4">
          <Skeleton width={50} height={16} />
        </div>
      </div>

      {/* 본문 요약 */}
      <div className="mb-3">
        <Skeleton width="90%" height={20} />
      </div>

      {/* 하단: 프로필, 닉네임, 조회수 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton circle width={28} height={28} />
          <Skeleton width={80} height={16} />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton width={40} height={16} />
          <Skeleton width={40} height={16} />
        </div>
      </div>
    </li>
  );
}
