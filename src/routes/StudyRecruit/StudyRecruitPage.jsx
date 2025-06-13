import RecruitBoxContainer from "../../components/StudyRecruit/RecruitBoxContainer";
import StudyRecruitAPI from "../../api/studyRecruit";
import { useState, useEffect } from "react";

import StudydRecruitBar from "./StudyRecruitBar";

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
      <h1 className="text-4xl font-bold mx-auto mt-14 mb-10">스터디 구인</h1>
      <StudydRecruitBar />
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
