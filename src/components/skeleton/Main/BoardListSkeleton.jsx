import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BoardListSkeleton({ count = 4 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-1">
          <Skeleton height={16} width="65%" />
          <Skeleton height={12} width="85%" />
        </div>
      ))}
    </div>
  );
}
