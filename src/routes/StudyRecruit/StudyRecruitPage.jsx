import { useRef } from "react";
import Jaeyoung from "../../components/StudyRecruit/Jaeyoung";
import RecruitBoxContainger from "../../components/StudyRecruit/RecruitBoxContainer";
export default function StudyRecruitPage() {
  const scrollRef = useRef(null);

  const scrollDown = () => {
    scrollRef.current.scrollBy({ top: 300, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mx-auto mt-10">스터디 구인</h1>
      <div className="bg-white rounded-4xl w-[1200px] h-[800px] p-12 mt-11 shadow-[0_0_6px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden">
        <input
          type="text"
          placeholder="스터디 그룹명을 검색하세요"
          className="flex mx-auto bg-white w-[500px] h-[50px] rounded-2xl p-4 border border-gray-300 shadow-[0_0_2px_rgba(0,0,0,0.1)] mb-6"
        />
        <div className="relative h-full">
          <div
            ref={scrollRef}
            className="grid grid-cols-2 overflow-y-auto h-full pr-2"
          >
            <RecruitBoxContainger>
              <Jaeyoung />
            </RecruitBoxContainger>

            <RecruitBoxContainger>
              <div className="flex-col items-center justify-center">
                <h2 className="text-xl font-bold mb-4">재현님 이럇사이마세</h2>
                <div className="flex gap-4">
                  <img
                    src="https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg"
                    className="rounded-2xl w-50 h-50 mr-2"
                  />
                  <p>
                    여기에 텍스트를 입력합니다.여기에 텍스트를 입력합니다.여기에
                    텍스트를 입력합니다.여기에 텍스트를 입력합니다.여기에
                    텍스트를 입력합니다.여기에 텍스트를 입력합니다.여기에
                    텍스트를 입력합니다.
                  </p>
                </div>
              </div>
            </RecruitBoxContainger>

            <RecruitBoxContainger>
              <div className="flex-col flex-col items-center justify-center gap-4">
                <h2 className="text-xl font-bold mb-4">지원웅니의 벵쿄시간</h2>
                <img
                  src="https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg"
                  className="rounded-2xl w-50 h-50"
                />
              </div>
            </RecruitBoxContainger>

            <RecruitBoxContainger>
              <div className="flex-col flex-col items-center justify-center gap-4">
                <h2 className="text-xl font-bold mb-4">파이팅~~~</h2>
                <img
                  src="https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg"
                  className="rounded-2xl w-50 h-50"
                />
              </div>
            </RecruitBoxContainger>
          </div>
          <button
            onClick={scrollDown}
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-2xl text-gray-400 hover:text-black z-10"
          >
            ▽
          </button>
        </div>
      </div>
    </div>
  );
}
