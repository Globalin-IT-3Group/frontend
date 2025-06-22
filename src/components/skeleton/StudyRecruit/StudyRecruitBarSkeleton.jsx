import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function StudyRecruitBarSkeleton() {
  return (
    <div className="bg-white w-full h-auto p-11 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex space-x-6 ml-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} width={90} height={30} borderRadius={12} />
          ))}
        </div>
        <div className="flex items-center justify-end gap-4 w-full max-w-3xl relative">
          <Skeleton circle width={28} height={28} />
          <Skeleton circle width={28} height={28} />
        </div>
      </div>
    </div>
  );
}
