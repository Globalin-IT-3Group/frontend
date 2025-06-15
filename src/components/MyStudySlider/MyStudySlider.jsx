import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function PrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-[24px] top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-zinc-600 hover:bg-gray-300 dark:hover:bg-zinc-500 transition"
    >
      <FiChevronLeft className="text-black dark:text-white" />
    </button>
  );
}

function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-[24px] top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-zinc-600 hover:bg-gray-300 dark:hover:bg-zinc-500 transition"
    >
      <FiChevronRight className="text-black dark:text-white" />
    </button>
  );
}


export default function MyStudySlider() {
  const navigate = useNavigate();

  const slides = [
    { id: 1, type: "study", name: "스터디1", imageUrl: "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg" },
    { id: 2, type: "study", name: "스터디2", imageUrl: "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg" },
    { id: 3, type: "study", name: "스터디3", imageUrl: "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg" },
    { id: 4, type: "add" },
  ];

  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  const [currentSlide, setCurrentSlide] = React.useState(0);

  return (
    <div className="bg-white dark:bg-zinc-700 rounded-4xl shadow p-8 relative max-w-7xl">
      <p className="font-semibold mb-14 text-2xl">내 스터디</p>

      <Slider {...settings}>
        {slides.map((slide, idx) => {
          const isCenter = idx === currentSlide;
          return (
            <div key={idx} className="px-2">
              <div
                className={`mx-auto md:aspect-[3/3] max-w-[200px] rounded-4xl overflow-hidden flex items-center justify-center transition-all duration-300
                  ${isCenter ? "scale-100 opacity-100" : "scale-90 opacity-60"}
                `}>
                {slide.type === "study" ? (
                  <img
                    src={slide.imageUrl}
                    alt={slide.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <button
                    onClick={() => navigate("/study/create")}
                    className="w-full h-full text-4xl bg-gray-100 dark:bg-zinc-600 text-gray-600 dark:text-white hover:bg-gray-300 dark:hover:bg-zinc-500"
                  >
                    +
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
