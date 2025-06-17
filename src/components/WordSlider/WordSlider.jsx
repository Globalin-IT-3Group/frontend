import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import styles from "./WordSlider.module.css";
import "./WordSliderGlobal.css";

export default function WordSlider() {
  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards]}
      className={styles.myswiper}
    >
      {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((word, idx) => (
        <SwiperSlide key={idx}>
          <div className="w-full h-full flex items-center justify-center overflow-visible">
            {word}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
