import { useEffect, useRef, useState } from "react";
import NewsApi from "../../api/newsAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function News() {
  const [news, setNews] = useState([]);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  useEffect(() => {
    // 실제 api 주소에 맞게 수정하세요!
    NewsApi.getNews().then(setNews);
  }, []);

  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <div className="w-full max-w-3xl aspect-[7/2] mx-auto bg-white dark:bg-zinc-700 rounded-4xl shadow p-6">
      <p className="font-semibold text-lg mb-4">今日のニュース🔥</p>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper h-full"
      >
        {news.map((item, idx) => (
          <SwiperSlide key={idx}>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-44 object-cover rounded-xl shadow mb-4"
                style={{ background: "#eee" }}
              />
              <div className="font-bold text-lg text-center text-gray-900 dark:text-white line-clamp-2 px-2">
                {item.title}
              </div>
            </a>
          </SwiperSlide>
        ))}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
}
