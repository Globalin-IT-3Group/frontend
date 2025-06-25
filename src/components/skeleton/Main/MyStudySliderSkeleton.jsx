import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Slider from "react-slick";

export default function MyStudySliderSkeleton() {
  const fakeSlides = [1, 2, 3];

  const settings = {
    infinite: false,
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 3 },
      },
    ],
  };

  return (
    <div className="bg-white w-full mx-auto dark:bg-zinc-700 overflow-visible rounded-4xl shadow p-8 relative max-w-5xl">
      <p className="font-semibold mb-14 text-center text-2xl">내 스터디룸</p>
      <Slider {...settings}>
        {fakeSlides.map((_, idx) => (
          <div key={idx} className="px-3">
            <div className="w-full mx-auto max-w-[200px] aspect-[3/3] mb-2">
              <div className="w-full h-full">
                <Skeleton width="100%" height="100%" borderRadius={24} />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
