import { useState } from "react";
import Slider from "react-slick";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StudyRoomCreateModal from "../../components/modals/StudyRoomCreateModal";

// 왼쪽 화살표
function PrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-[24px] top-1/2 -translate-y-1/2 z-1 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-zinc-600 hover:bg-gray-300 dark:hover:bg-zinc-500 transition"
    >
      <FiChevronLeft className="text-black dark:text-white" />
    </button>
  );
}

// 오른쪽 화살표
function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-[24px] top-1/2 -translate-y-1/2 z-1 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-zinc-600 hover:bg-gray-300 dark:hover:bg-zinc-500 transition"
    >
      <FiChevronRight className="text-black dark:text-white" />
    </button>
  );
}

export default function MyStudySlider({
  myStudyRooms = [],
  myUserId,
  onRefresh,
  onStudyRoomClick,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 참여중인 스터디 + 개설 버튼
  const slides = [
    ...myStudyRooms.map((room) => ({
      ...room,
      type: "study",
      isLeader: room.leaderId === myUserId,
    })),
    { id: "add", type: "add" },
  ];

  console.log("마잉유저 아이디: ", myUserId);

  const settings = {
    centerMode: true,
    infinite: slides.length > 3,
    centerPadding: "0px",
    slidesToShow: Math.min(3, slides.length),
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  return (
    <div className="bg-white dark:bg-zinc-700 overflow-visible rounded-4xl shadow p-8 relative max-w-7xl">
      <p className="font-semibold mb-14 text-2xl">내 스터디</p>
      <Slider {...settings}>
        {slides.map((slide, idx) => {
          const isCenter = idx === currentSlide;
          if (slide.type === "study") {
            return (
              <div key={slide.id} className="px-2">
                <div
                  className={`group relative mx-auto md:aspect-[3/3] max-w-[200px] rounded-4xl overflow-hidden flex items-center justify-center transition-all duration-500
                    ${
                      isCenter ? "scale-100 opacity-100" : "scale-90 opacity-60"
                    }
                  `}
                  onClick={() => onStudyRoomClick && onStudyRoomClick(slide.id)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={slide.imageUrl}
                    alt={slide.name}
                    className="w-full h-full object-cover"
                  />

                  {/* 호버 시 어둡게 덮는 레이어 + 가운데 흰 글씨 */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-lg font-bold drop-shadow text-center px-2">
                      {slide.name}
                    </span>
                  </div>

                  {slide.isLeader && (
                    <span className="absolute left-3 top-3 bg-white/70 rounded-full p-1 text-yellow-400 text-xl shadow">
                      <FaStar />
                    </span>
                  )}
                </div>
              </div>
            );
          } else if (slide.type === "add") {
            return (
              <div key="add" className="px-2">
                <div
                  className={`mx-auto md:aspect-[3/3] max-w-[200px] rounded-4xl overflow-hidden flex items-center justify-center transition-all duration-500
                    ${
                      isCenter ? "scale-100 opacity-100" : "scale-90 opacity-60"
                    }
                  `}
                >
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full h-full text-4xl bg-gray-100 dark:bg-zinc-600 text-gray-600 dark:text-white hover:bg-gray-300 dark:hover:bg-zinc-500 transition rounded-4xl"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          }
          return null;
        })}
      </Slider>
      <StudyRoomCreateModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          setModalOpen(false);
          if (onRefresh) onRefresh();
        }}
      />
    </div>
  );
}
