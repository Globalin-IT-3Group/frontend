import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import RecruitBoxContainer from "../../components/StudyRecruit/RecruitBoxContainer";
import StudyRecruitAPI from "../../api/studyRecruit";
import { useState, useEffect } from "react";
import { HashtagIcon } from "@heroicons/react/24/outline";

export default function StudyRecruitPage() {
  const [studyRoomList, setStudyRoomList] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

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
      <div className="bg-white w-full h-auto p-8 mt-10 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex space-x-8 ml-4">
            <span className="text-md text-gray-600 hover:text-black cursor-pointer">
              New
            </span>
            <span className="text-md text-gray-600 hover:text-black cursor-pointer">
              Most View
            </span>
            <span className="text-md text-gray-600 hover:text-black cursor-pointer">
              My Request
            </span>
          </div>
          <div className="flex items-center justify-end gap-4 w-full max-w-3xl relative">
            <div className="relative h-[50px]">
              <input
                type="text"
                placeholder="스터디 그룹명을 검색하세요"
                className={`absolute right-0 h-[50px] rounded-2xl border border-gray-300 shadow pl-4 pr-4 bg-white
          transition-all duration-300 ease-in-out
          ${
            showSearch
              ? "w-[300px] opacity-100"
              : "w-0 opacity-0 overflow-hidden"
          }`}
              />
            </div>
            <MagnifyingGlassIcon
              className="w-5 h-5 text-gray-500 hover:text-black cursor-pointer"
              onClick={() => setShowSearch((prev) => !prev)}
            />
            <HashtagIcon className="w-5 h-5 text-gray-500 hover:text-black cursor-pointer" />
          </div>
        </div>
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
  );
}
