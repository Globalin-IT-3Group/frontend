import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import StudyRoomListContainer from "./StudyRoomListContainer";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination } from "swiper/modules";

export default function StudyRoomListModal() {
  return (
    <div className="w-[900px] overflow-visible">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={0}
        coverflowEffect={{
          rotate: 50,
          stretch: -30,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        loop={false}
        modules={[EffectCoverflow, Pagination]}
        className="mySwipe"
      >
        <SwiperSlide>
          <StudyRoomListContainer>
            <img
              src="https://swiperjs.com/demos/images/nature-1.jpg"
              className="w-[300px] h-auto object-cover rounded-xl"
            />
          </StudyRoomListContainer>
        </SwiperSlide>
        <SwiperSlide>
          <StudyRoomListContainer>
            <img
              src="https://swiperjs.com/demos/images/nature-2.jpg"
              className="w-[300px] h-auto object-cover rounded-xl"
            />
          </StudyRoomListContainer>
        </SwiperSlide>
        <SwiperSlide>
          <StudyRoomListContainer>
            <img
              src="https://swiperjs.com/demos/images/nature-3.jpg"
              className="w-[300px] h-auto object-cover rounded-xl"
            />
          </StudyRoomListContainer>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://swiperjs.com/demos/images/nature-4.jpg"
            className="w-[400px] h-auto object-cover rounded-xl"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
