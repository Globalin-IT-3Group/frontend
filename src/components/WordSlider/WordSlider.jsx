import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import styles from "./WordSlider.module.css";
import "./WordSliderGlobal.css";

// ❗ props에서 onCardClick을 받아야 함
export default function WordSlider({ words, onCardClick }) {
  return (
    <div className="word-slider">
      <Swiper
        effect="cards"
        grabCursor={true}
        modules={[EffectCards]}
        className={styles.mySwiper}
      >
        {words.map((word, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="w-full h-full flex items-center justify-center cursor-pointer"
              onClick={() => onCardClick(word)}
            >
              {word.jpWord}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
