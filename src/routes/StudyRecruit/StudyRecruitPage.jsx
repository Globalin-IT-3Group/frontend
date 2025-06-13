import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import RecruitBoxContainer from "../../components/StudyRecruit/RecruitBoxContainer";
import StudyRecruitAPI from "../../api/studyRecruit";
import { useState, useEffect } from "react";

export default function StudyRecruitPage() {
  const [studyRoomList, setStudyRoomList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const api = new StudyRecruitAPI();
      const data = await api.getStudyRecruitByCategory({
        category: "일본어",
        tag: "회화",
      });
      console.log("받은 데이터", data);
      setStudyRoomList(data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mx-auto mt-14">스터디 구인</h1>
      <div className="bg-white  w-full h-auto p-12 mt-11 flex flex-col overflow-hidden">
        <div className="relative w-full max-w-[500px] mx-auto mb-6">
          <input
            type="text"
            placeholder="스터디 그룹명을 검색하세요"
            className="w-full h-[50px] rounded-2xl p-4 pr-12 border border-gray-300 shadow-[0_0_2px_rgba(0,0,0,0.1)]"
          />

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black focus:outline-none active:scale-95 transition cursor-pointer"
            onClick={() => console.log("검색")}
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="relative h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-full pr-2">
            {studyRoomList.map((study) => (
              <RecruitBoxContainer
                key={study.id}
                image="/6.jpg"
                roomName={study.title}
                studyExplain={study.studyExplain}
                profileImage={study.leader.profileImage}
                leader={study.leader.nickname}
                createdAt={study.createdAt}
                userCount={`${study.userCount}/4 모집 완료`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
