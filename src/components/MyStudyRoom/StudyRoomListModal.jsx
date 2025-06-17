import { Swiper, SwiperSlide } from "swiper/react";
import StudyRoomListContainer from "./StudyRoomListContainer";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";

export default function StudyRoomListModal({ onClose }) {
  const getRandomColor = () => {
    const colors = [
      "bg-red-200",
      "bg-green-200",
      "bg-blue-200",
      "bg-purple-200",
      "bg-pink-200",
      "bg-yellow-200",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex w-full max-w-[1000px] p-20 overflow-visible relative">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          spaceBetween={34}
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
          modules={[EffectCoverflow, Pagination]}
          className="mySwipe"
        >
          <SwiperSlide>
            <StudyRoomListContainer bgColor={getRandomColor()}>
              <img src="/pinga1.jpg" />
            </StudyRoomListContainer>
          </SwiperSlide>
          <SwiperSlide>
            <StudyRoomListContainer bgColor={getRandomColor()}>
              <img src="/pinga2.jpg" />
            </StudyRoomListContainer>
          </SwiperSlide>
          <SwiperSlide>
            <StudyRoomListContainer bgColor={getRandomColor()}>
              <img src="/pinga3.jpg" />
            </StudyRoomListContainer>
          </SwiperSlide>
          <SwiperSlide>
            <StudyRoomListContainer bgColor={getRandomColor()}>
              <img src="/pinga4.jpg" />
            </StudyRoomListContainer>
          </SwiperSlide>
        </Swiper>
        <div className="custom-fraction absolute bottom-3 right-4 text-white font-bold text-base z-10"></div>
      </div>
    </div>
  );
}
