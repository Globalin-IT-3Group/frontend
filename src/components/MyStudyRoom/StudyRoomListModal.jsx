import { Swiper, SwiperSlide } from "swiper/react";
import StudyRoomListContainer from "./StudyRoomListContainer";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Styles from "./StudyRoomListModal.module.css";
import { useRef, useEffect, useState } from "react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
import StudyRoomCreateModal from "../../components/modals/StudyRoomCreateModal";

const DEFAULT_IMAGE_URL =
  "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg";

export default function StudyRoomListModal({
  studyRooms = [],
  loading,
  onClose,
}) {
  const swiperRef = useRef(null);
  const user = useSelector((state) => state.auth);
  const myUserId = user.id;
  const [modalOpen, setModalOpen] = useState(false);

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
      "bg-gradient-to-b from-[#D2FEFF] to-white", //하늘
      "bg-gradient-to-b from-[#FBF7B8] to-white", //노랑
      "bg-gradient-to-b from-[#BCECFF] to-white", //파랑
      "bg-gradient-to-b from-[#FACFD9] to-white", //분홍
      "bg-gradient-to-b from-[#E4E2F8] to-white", //보라
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
            className="top-8 right-8 text-white text-3xl font-bold z-50 hover:text-blue-400 hover:rotate-90 hover:scale-110 transition-all duration-200 cursor-pointer"
          >
            ✖
          </button>
        </div>

        <div className="flex w-full max-w-[1000px] p-20 overflow-visible relative">
          <div
            className={`custom-swiper-button-prev absolute top-1/2 left-0 z-50 -translate-y-1/2 cursor-pointer active:scale-110 hover:scale-125 transition-all duration-300  ${Styles.customPrev}`}
          >
            <span className="text-white text-2xl font-bold px-2">◀</span>
          </div>
          <Swiper
            ref={swiperRef}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={studyRooms.length === 0 ? 1 : 3}
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
            navigation={{
              nextEl: ".custom-swiper-button-next",
              prevEl: ".custom-swiper-button-prev",
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className={Styles.studyRoomslider}
          >
            {loading ? (
              <SwiperSlide>
                <div className="flex items-center justify-center h-60 text-lg text-gray-400">
                  불러오는 중...
                </div>
              </SwiperSlide>
            ) : studyRooms.length === 0 ? (
              <SwiperSlide>
                <StudyRoomListContainer
                  bgColor="bg-gradient-to-b from-gray-200 to-white"
                  label="스터디방 만들기"
                  onClose={onClose}
                  isLeader={false}
                >
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-[260px] h-[260px] rounded-2xl text-7xl bg-gray-100 dark:bg-zinc-600 text-gray-400 dark:text-white hover:bg-gray-300 dark:hover:bg-zinc-500 transition flex items-center justify-center shadow-xl"
                    aria-label="스터디방 생성"
                  >
                    +
                  </button>
                </StudyRoomListContainer>
              </SwiperSlide>
            ) : (
              studyRooms.map((room) => (
                <SwiperSlide key={room.id}>
                  <StudyRoomListContainer
                    bgColor={getRandomColor()}
                    label={room.name}
                    onClose={onClose}
                    isLeader={room.leaderId === myUserId}
                  >
                    <img
                      src={room.imageUrl || DEFAULT_IMAGE_URL}
                      alt={room.name}
                    />
                  </StudyRoomListContainer>
                </SwiperSlide>
              ))
            )}
          </Swiper>
          <div
            className={`custom-swiper-button-next absolute top-1/2 right-0 z-50 -translate-y-1/2 cursor-pointer active:scale-110 hover:scale-125 transition-all duration-300  ${Styles.customNext}`}
          >
            <span className="text-white text-2xl font-bold px-2">▶</span>
          </div>
        </div>
      </div>
      <div
        className="custom-fraction absolute bottom-3 translate-x-1/2 font-bold text-base z-50 pointer-events-none mb-16"
        style={{ color: "white" }}
      ></div>
      <StudyRoomCreateModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          setModalOpen(false);
          // 필요하면 방 목록 새로고침
        }}
      />
    </div>
  );
}
