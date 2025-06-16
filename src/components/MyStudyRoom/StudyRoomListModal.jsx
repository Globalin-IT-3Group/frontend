import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function StudyRoomListModal({ onClose }) {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-4xl w-[500px] h-[600px] p-6 shadow-md flex items-center justify-center">
        <div className="slider-container w-full h-full">
          <Slider {...settings}>
            <div className="flex items-center justify-center w-full h-[500px]">
              <Link to="/study/mystudyroom">
                <img
                  src="/pinga1.jpg"
                  alt="study1"
                  className="w-[400px] h-[400px] rounded-2xl object-cover mx-auto flex flex-col items-center mt-10"
                />
              </Link>
            </div>
            <div className="flex items-center justify-center w-full h-[500px]">
              <Link to="/study/mystudyroom">
                <img
                  src="/pinga2.jpg"
                  alt="study2"
                  className="w-40 h-40 rounded-2xl object-cover"
                />
              </Link>
            </div>
            <div className="flex items-center justify-center w-full h-[500px]">
              <Link to="/study/mystudyroom">
                <img
                  src="/pinga3.jpg"
                  alt="study3"
                  className="w-40 h-40 rounded-2xl object-cover"
                />
              </Link>
            </div>
            <div className="flex items-center justify-center w-full h-[500px]">
              <Link to="/study/mystudyroom">
                <img
                  src="/pinga4.jpg"
                  alt="study4"
                  className="w-40 h-40 rounded-2xl object-cover"
                />
              </Link>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
