import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import styles from "./WordSlider.module.css";
import "./WordSliderGlobal.css";

export default function WordModal({ words = [], selectedWord, onClose }) {
  if (!Array.isArray(words) || words.length === 0 || !selectedWord) return null;

  const initialIndex = words.findIndex((w) => w.jpWord === selectedWord.jpWord);
  const getColor = (index) => {
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
        <div className="text-center mb-6 mt-2">
          <h2 className="text-white text-3xl font-bold">一日の単語！</h2>
        </div>

        <div className="w-full flex flex-col justify-center h-[498px]">
          <Swiper
            effect="cards"
            grabCursor={true}
            initialSlide={initialIndex}
            modules={[EffectCards]}
            className={styles.mySwiper}
          >
            {words.map((word, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className="w-full h-full flex flex-col items-center justify-center text-white text-xl font-bold rounded-2xl p-4 text-center"
                  style={{ backgroundColor: getColor(idx) }}
                >
                  <div className="text-3xl mb-2">{word.jpWord}</div>
                  <div className="text-base">
                    {word.hiragana}・{word.altForm}
                  </div>
                  <div className="text-sm mt-1">{word.meaning}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <button
          onClick={onClose}
          className="mx-auto inline-flex items-center justify-center rounded-full w-10 h-10 text-white text-3xl font-bold bg-black/0 hover:bg-white/90 transition-all duration-300 scale-90 hover:scale-125 hover:text-gray-600 outline-none cursor-pointer"
          aria-label="닫기"
          type="button"
        >
          ✖
        </button>
      </div>
    </div>
  );
}
