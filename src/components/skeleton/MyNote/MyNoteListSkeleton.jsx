import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function MyNoteListSkeleton() {
  return (
    <div>
      <ul className="divide-y divide-gray-200">
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index} className="flex items-center py-4 p-4">
            <div className="rounded-md">
              <Skeleton width={96} height={96} />
            </div>
            <div className="ml-4 flex-1">
              <Skeleton width={50} height={20} />
              <Skeleton width={80} height={20} />
            </div>
            <Skeleton width={80} height={20} />
          </li>
        ))}
      </ul>
    </div>
  );
}
