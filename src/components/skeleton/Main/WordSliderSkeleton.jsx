import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function WordSliderSkeleton() {
  const fakeCards = Array.from({ length: 5 });

  return (
    <div className="relative w-[240px] h-[320px] mx-auto">
      {fakeCards.map((_, idx) => (
        <div
          key={idx}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
          style={{
            transform: `
              scale(${1 - idx * 0.04})
              rotate(${idx * 3}deg)
              translateX(${idx * 10}px)
            `,
            zIndex: 10 - idx,
            opacity: idx === 0 ? 1 : 0.5,
            transition: "all 0.3s ease",
          }}
        >
          <div className="w-[100%] h-[100%] mb-2">
            <Skeleton
              height="100%"
              width="100%"
              borderRadius={18}
              baseColor="#e0e0e0"
              highlightColor="#f5f5f5"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
