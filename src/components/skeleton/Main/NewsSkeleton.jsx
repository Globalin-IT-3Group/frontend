import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Slider from "react-slick";

export default function NewsSkeleton() {
  const fakeItems = [1, 2, 3, 4, 5, 6, 7, 8];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    centerPadding: "2px",
    responsive: [
      {
        breakpoint: 900,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="w-full max-w-5xl min-h-[330px] mx-auto bg-white dark:bg-zinc-700 rounded-4xl shadow p-8">
      {/* <p className="font-semibold text-center text-2xl mb-4 mt-1">
        오늘의 뉴스🔥
      </p> */}
      <Slider {...settings}>
        {fakeItems.map((_, idx) => (
          <div key={idx} className="px-4">
            <div className="flex flex-col items-center justify-center w-full">
              {/* 이미지 영역 */}
              <div className="w-full aspect-[16/9] relative mb-4">
                <Skeleton className="absolute inset-0 w-full h-full" />
              </div>
              {/* 제목 영역 */}
              <div className="w-full px-1 mb-1">
                <Skeleton height={22} />
                <Skeleton height={22} />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
