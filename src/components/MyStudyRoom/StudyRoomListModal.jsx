import { Swiper, SwiperSlide } from "swiper/react";
import StudyRoomListContainer from "./StudyRoomListContainer";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Styles from "./StudyRoomListModal.module.css";
import { useRef, useEffect } from "react";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

export default function StudyRoomListModal({ onClose }) {
  const swiperRef = useRef(null);
  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    if (swiperInstance?.pagination) {
      swiperInstance.pagination.init();
      swiperInstance.pagination.render();
      swiperInstance.pagination.update();
    }
  }, []);

  const getRandomColor = () => {
    const colors = [
      "bg-gradient-to-b from-blue-200 to-white",
      "bg-gradient-to-b from-yellow-200 to-white",
      "bg-gradient-to-b from-pink-200 to-white",
      "bg-gradient-to-b from-red-200 to-white",
      "bg-gradient-to-b from-green-200 to-white",
      "bg-gradient-to-b from-gray-200 to-white",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex flex-col justify-center">
        <div className="flex">
          <div className="text-3xl font-bold text-white mx-auto">
            스터디방을 선택해 주세요!
          </div>
          <button
            onClick={onClose}
            className="top-8 right-8 text-white text-3xl font-bold z-50 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
          >
            ×
          </button>
        </div>

        <div className="flex w-full max-w-[1000px] p-20 overflow-visible relative">
          <div className="custom-swiper-button-prev absolute top-1/2 left-0 z-50 -translate-y-1/2 cursor-pointer">
            <span className="text-white text-2xl font-bold px-2">◀</span>
          </div>
          <Swiper
            ref={swiperRef}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            spaceBetween={32}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 50,
              modifier: 1,
              slideShadows: true,
            }}
            observer={true}
            observeParents={true}
            pagination={{
              el: ".custom-fraction",
              type: "fraction",
            }}
            navigation={{
              nextEl: ".custom-swiper-button-next",
              prevEl: ".custom-swiper-button-prev",
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className={Styles.studyRoomslider}
          >
            <SwiperSlide>
              <StudyRoomListContainer
                bgColor={getRandomColor()}
                label="안녕하세요!"
                onClose={onClose}
              >
                <img src="/pinga1.jpg" />
              </StudyRoomListContainer>
            </SwiperSlide>
            <SwiperSlide>
              <StudyRoomListContainer
                bgColor={getRandomColor()}
                label="코츠코츠 파이팅~"
                onClose={onClose}
              >
                <img src="/pinga2.jpg" />
              </StudyRoomListContainer>
            </SwiperSlide>
            <SwiperSlide>
              <StudyRoomListContainer
                bgColor={getRandomColor()}
                label="들을엉.. 푸데데.."
                onClose={onClose}
              >
                <img src="/pinga3.jpg" />
              </StudyRoomListContainer>
            </SwiperSlide>
            <SwiperSlide>
              <StudyRoomListContainer
                bgColor={getRandomColor()}
                label="슬라이드 끝!"
                onClose={onClose}
              >
                <img src="/pinga4.jpg" />
              </StudyRoomListContainer>
            </SwiperSlide>
          </Swiper>
          <div className="custom-swiper-button-next absolute top-1/2 right-0 z-50 -translate-y-1/2 cursor-pointer">
            <span className="text-white text-2xl font-bold px-2">▶</span>
          </div>
        </div>
      </div>
      <div
        className="custom-fraction absolute bottom-3 translate-x-1/2 font-bold text-base z-50 pointer-events-none mb-16"
        style={{ color: "white" }}
      ></div>
    </div>
  );
}
