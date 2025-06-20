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
      "#AFC2FF",
      "#9BB3FF",
      "#88A4FF",
      "#7495FF",
      "#6186FF",
      "#1D44FF",
      "#3968FF",
      "#2659FF",
      "#124AFF",
    ];
    const index = parseInt(word) - 1;
    return colors[index % colors.length];
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex flex-col justify-center max-w-[1000px] w-full px-20 relative">
        {/* 닫기 버튼 - 오른쪽 상단 고정 */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 text-white text-3xl font-bold hover:text-blue-400 transition-colors duration-200 cursor-pointer"
        >
          ✖
        </button>

        {/* 중앙 정렬 텍스트 */}
        <div className="text-center mb-6 mt-2">
          <h2 className="text-white text-3xl font-bold">一日の単語！</h2>
        </div>

        {/* 슬라이더 */}
        <div className="w-full flex flex-col justify-center h-[498px]">
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
      </div>
    </div>
  );
}
