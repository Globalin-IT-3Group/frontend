import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function RecruitBoxContainerSkeleton() {
  return (
    <div className="cursor-pointer bg-white rounded-4xl w-full shadow-[0_0_4px_rgba(0,0,0,0.1)] flex flex-col sm:min-h-[440px] lg:min-h-[460px] transition-transform duration-300">
      {/* 상단 이미지 부분 */}
      <div className="w-full h-[200px] overflow-hidden rounded-t-4xl">
        <Skeleton
          width="100%"
          height="100%"
          style={{
            height: "200px",
            width: "100%",
            objectFit: "cover",
            objectPosition: "top",
            display: "block",
          }}
        />
      </div>

      {/* 내부 컨텐츠 */}
      <div className="flex flex-col justify-between h-full p-6">
        <div>
          <Skeleton width="70%" height={24} className="mb-2" />
          <Skeleton count={2} height={16} />
        </div>

        <div>
          <div className="border-t border-gray-100 my-4" />
          <div className="flex flex-wrap items-center justify-between gap-y-1">
            {/* 프로필 */}
            <div className="flex gap-1">
              <Skeleton circle width={20} height={20} />
              <Skeleton width={60} height={14} />
            </div>

            {/* 날짜 및 인원수 */}
            <div className="flex items-end gap-1">
              <Skeleton width={80} height={14} />
              <Skeleton width={80} height={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
