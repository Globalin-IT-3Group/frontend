import { useRef } from "react";
import NewsApi from "../../api/newsAPI";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewsSkeleton from "../skeleton/Main/NewsSkeleton";

export default function News({ news = [] }) {
  const sliderRef = useRef(null);

  // Slick 설정
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3, // 한 화면에 3개
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
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
      <p className="font-semibold text-center text-2xl mb-6">오늘의 뉴스🔥</p>
      {news.length === 0 ? (
        <NewsSkeleton />
      ) : (
        <Slider ref={sliderRef} {...settings}>
          {news.map((item, idx) => (
            <div key={idx} className="px-4">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center w-full"
              >
                <div className="w-full aspect-[16/9] min-h-auto flex items-center justify-center overflow-hidden shadow mb-3 bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-100% h-100% object-cover object-center"
                  />
                </div>
                <div className="font-bold text-xl text-center text-gray-900 dark:text-white line-clamp-2">
                  {item.title}
                </div>
              </a>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
