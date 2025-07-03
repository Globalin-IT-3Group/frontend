import Skeleton from "react-loading-skeleton";

export default function AlarmSkeleton() {
  const fakeAlarms = [1, 2, 3];

  return (
    <div className="w-full h-full flex flex-col space-y-1">
      {fakeAlarms.map((_, idx) => (
        <div key={idx}>
          <div className="w-full mb-2 flex items-center justify-between shadow border-2 border-gray-100 p-3">
            <Skeleton width="clamp(150px, 30vw, 200px)" height={20} />{" "}
            <Skeleton width="clamp(120px, 25vw, 180px)" height={15} />{" "}
          </div>
        </div>
      ))}
    </div>
  );
}
