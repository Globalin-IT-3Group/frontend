import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import styles from "./WordSlider.module.css";
import "./WordSliderGlobal.css";

export default function WordModal({ word, onClose }) {
  const wordList = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const initialIndex = wordList.indexOf(word);

  const getColor = (word) => {
    const colors = [
      "#AFC2FF", "#9BB3FF", "#88A4FF", "#7495FF", "#6186FF",
      "#1D44FF", "#3968FF", "#2659FF", "#124AFF",
    ];
    const index = parseInt(word) - 1;
    return colors[index % colors.length];
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-2xl font-bold hover:text-gray-300 z-50"
      >
        ✖
      </button>

      <Swiper
        effect="cards"
        grabCursor={true}
        initialSlide={initialIndex}
        modules={[EffectCards]}
        className={styles.mySwiper}
      >
        {wordList.map((w, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="w-full h-full flex items-center justify-center text-white text-3xl font-bold rounded-2xl"
              style={{ backgroundColor: getColor(w) }}
            >
              {w}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
