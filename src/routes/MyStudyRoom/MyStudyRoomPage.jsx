import MemberProfile from "../../components/MyStudyRoom/MemberProfile";
import StudyRoomRule from "../../components/MyStudyRoom/StudyRoomRule";
import { IoChatbubbleEllipses } from "react-icons/io5";
import StudyRoomApi from "../../api/studyRoomAPI";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import KotsuKotsuLoader from "../../components/loadings/KotsuKotsuLoader";
import StudyNote from "./StudyNote";
import StudyChat from "./StudyChat";
import StudyRecruitFormModal from "../../components/StudyRecruit/StudyRecruitFormModal";

export default function MyStudyRoomPage() {
  const { studyRoomId } = useParams(); // 스터디방 id
  const [studyRoom, setStudyRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("note");
  const [showRecruitModal, setShowRecruitModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("아이디!!!: ", studyRoomId);

    StudyRoomApi.getStudyRoomDetail(studyRoomId)
      .then((result) => {
        console.log(result);
        setStudyRoom(result);
      })
      .finally(() => setLoading(false));
  }, [studyRoomId]);

  if (loading) return <KotsuKotsuLoader />;
  if (!studyRoom) return <div>스터디룸 정보를 불러올 수 없습니다.</div>;

  const leader = studyRoom.members.find((m) => m.userId === studyRoom.leaderId);
  const members = studyRoom.members.filter(
    (m) => m.userId !== studyRoom.leaderId
  );

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4 py-4 gap-8">
      <div>
        <h1 className="text-4xl font-bold mx-auto mt-6 mb-10">
          {studyRoom.name}
        </h1>
      </div>
      <div className="rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] p-4">
        <div className="flex flex-col justify-center mx-auto gap-4 w-full">
          <div className="flex justify-center mx-auto gap-4">
            <MemberProfile
              leader={leader}
              members={members}
              onRecruitWrite={() => setShowRecruitModal(true)}
            />
            <StudyRoomRule rule={studyRoom.rule} />
          </div>
          <div className="flex justify-center font-bold w-full rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] p-4 mx-auto">
            🔔 {studyRoom.notice || "오늘의 공지는 없습니다!"}
          </div>
        </div>
      </div>
      <div className="flex gap-6">
        {/* 탭 버튼들 */}
        <button
          onClick={() => setActiveTab("note")}
          className={`flex flex-col items-center justify-center rounded-2xl p-4 shadow-sm transition-all duration-300 space-y-1
            ${
              activeTab === "note"
                ? "bg-pink-300 text-white scale-105"
                : "bg-pink-100 hover:bg-pink-200 hover:scale-105"
            }`}
        >
          <div className="text-3xl">📒</div>
          <p className="text-sm font-semibold">스터디 노트</p>
        </button>
        <button
          onClick={() => setActiveTab("chat")}
          className={`flex flex-col items-center justify-center rounded-2xl py-4 px-5 shadow-sm transition-all duration-300 space-y-1
            ${
              activeTab === "chat"
                ? "bg-pink-300 text-white scale-105"
                : "bg-pink-100 hover:bg-pink-200 hover:scale-105"
            }`}
        >
          <div className="text-3xl text-blue">
            <IoChatbubbleEllipses className="text-orange-500" />
          </div>
          <p className="text-sm font-semibold">채팅 참여</p>
        </button>
        {/* 페이지 이동 버튼 */}
        <button
          onClick={() => navigate("/video-room")} // 원하는 경로로 수정
          className="flex flex-col items-center justify-center rounded-2xl p-4 shadow-sm transition-all duration-300 space-y-1 bg-pink-100 hover:bg-pink-200 hover:scale-105"
        >
          <div className="text-3xl">🎦</div>
          <p className="text-sm font-semibold">채팅방 생성</p>
        </button>
      </div>

      {/* 아래 영역: 탭별로 컴포넌트 바꿔치기 */}
      <div className="w-[1000px] flex flex-col rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] p-4 gap-4 mt-4">
        {activeTab === "note" && <StudyNote studyRoomId={studyRoom.id} />}
        {activeTab === "chat" && <StudyChat />}
        {/* 🎦은 여기 X, 그냥 페이지 이동만 */}
      </div>
      <StudyRecruitFormModal
        open={showRecruitModal}
        onClose={() => setShowRecruitModal(false)}
        studyRoomId={studyRoom.id}
        onSuccess={() => {
          // 목록 새로고침 등 필요시
        }}
      />
    </div>
  );
}
