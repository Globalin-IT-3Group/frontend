import RecruitBoxContainer from "../../components/StudyRecruit/RecruitBoxContainer";
import StudyRecruitAPI from "../../api/studyRecruit";
import { useState, useEffect } from "react";
import StudyRecruitModal from "../../components/StudyRecruit/StudyRecruitModal";
import StudydRecruitBar from "../../components/StudyRecruit/StudyRecruitBar";
import StudyRequestFormModal from "../../components/StudyRecruit/StudyRequestFormModal";

export default function StudyRecruitPage() {
  const [studyRoomList, setStudyRoomList] = useState([]);
  const [showRecruitModal, setShowRecruitModal] = useState(false);
  const [selectedModal, setSelecetedModal] = useState(null);
  const [showRequestFormModal, setShowRequestFormModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const api = new StudyRecruitAPI();
      const data = await api.getStudyRecruitByCategory({
        category: "일본어",
        tag: "회화",
      });
      setStudyRoomList(data);
    };

    fetchData();
  }, []);

  const handleOpenRecruitModal = (study) => {
    setSelecetedModal(study);
    setShowRecruitModal(true);
  };

  const handleOpenRequestFormModal = () => {
    setShowRecruitModal(false);
    setShowRequestFormModal(true);
  };

  const handleCloseRequestFormModal = () => {
    setShowRequestFormModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mx-auto mt-10 mb-10">스터디 구인</h1>
      <StudydRecruitBar />
      <div className="relative h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 h-full pr-2">
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
              onClick={() => handleOpenRecruitModal(study)}
            />
          ))}
        </div>
      </div>

      {showRecruitModal && selectedModal && (
        <StudyRecruitModal
          image="/6.jpg"
          roomName={selectedModal.title}
          studyExplain={selectedModal.studyExplain}
          profileImage={selectedModal.leader.profileImage}
          leader={selectedModal.leader.nickname}
          createdAt={selectedModal.createdAt}
          userCount={`${selectedModal.userCount}/4 모집 완료`}
          viewCount={selectedModal.viewCount}
          onClose={() => setShowRecruitModal(false)}
          onRequestFormOpen={handleOpenRequestFormModal}
        />
      )}

      {showRequestFormModal && selectedModal && (
        <StudyRequestFormModal
          roomName={selectedModal.title}
          onClose={handleCloseRequestFormModal}
        />
      )}
    </div>
  );
}
