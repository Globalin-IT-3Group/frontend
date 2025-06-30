import MemberProfile from "../../components/MyStudyRoom/MemberProfile";
import { IoChatbubbleEllipses } from "react-icons/io5";
import StudyRoomApi from "../../api/studyRoomAPI";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import KotsuKotsuLoader from "../../components/loadings/KotsuKotsuLoader";
import StudyNote from "./StudyNote";
import StudyChat from "./StudyChat";
import StudyRecruitFormModal from "../../components/StudyRecruit/StudyRecruitFormModal";
import StudyRecruitApi from "../../api/studyRecruitAPI";
import StudyRoomRule from "../../components/MyStudyRoom/StudyroomRule";
import MemberProfileSkeleton from "../../components/skeleton/MyStudyRoom/MemberProfileSkeleton";
import StudyRoomRuleSkeleton from "../../components/skeleton/MyStudyRoom/StudyRoomRuleSkeleton";
import Skeleton from "react-loading-skeleton";
import StudyNoteSkeleteon from "../../components/skeleton/MyStudyRoom/StudyNoteSkeleteon";
import StudyRoomEditModal from "../../components/modals/StudyRoomEditModal";

export default function MyStudyRoomPage() {
  const { studyRoomId } = useParams();
  const [studyRoom, setStudyRoom] = useState(null);
  const [studyRecruit, setStudyRecruit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("note");
  const [recruitLoading, setRecruitLoading] = useState(false);
  const [showRecruitModal, setShowRecruitModal] = useState(false);
  const navigate = useNavigate();
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // 스켈레톤 로딩
  useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // 스터디룸 상세 조회
  useEffect(() => {
    setLoading(true);
    StudyRoomApi.getStudyRoomDetail(studyRoomId)
      .then((result) => setStudyRoom(result))
      .finally(() => setLoading(false));
  }, [studyRoomId]);

  // 구인글 정보 조회
  useEffect(() => {
    if (!studyRoomId) return;
    setRecruitLoading(true);
    StudyRecruitApi.getStudyRecruitInStudyRoom(studyRoomId)
      .then((res) => setStudyRecruit(res))
      .catch(() => setStudyRecruit(null))
      .finally(() => setRecruitLoading(false));
  }, [studyRoomId]);

  // 구인글 작성/수정 성공 후 재조회
  const handleRecruitSuccess = () => {
    setShowRecruitModal(false);
    StudyRecruitApi.getStudyRecruitInStudyRoom(studyRoomId).then(
      setStudyRecruit
    );
  };

  if (loading) return <KotsuKotsuLoader />;
  if (!studyRoom) return <div>스터디룸 정보를 불러올 수 없습니다.</div>;

  const leader = studyRoom.members.find((m) => m.userId === studyRoom.leaderId);
  const members = studyRoom.members.filter(
    (m) => m.userId !== studyRoom.leaderId
  );

  const fetchStudyRoom = () => {
    setLoading(true);
    StudyRoomApi.getStudyRoomDetail(studyRoomId)
      .then((result) => setStudyRoom(result))
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4 py-4 gap-8">
      <div>
        <h1 className="text-4xl font-bold mx-auto mt-6 mb-10 dark:text-white">
          {studyRoom.name}
        </h1>
      </div>
      <div className="w-full max-w-[1000px] dark:bg-zinc-600 rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] p-4">
        <div className="flex flex-col justify-center mx-auto gap-4 w-full">
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-4 w-full">
            {showSkeleton ? (
              <>
                <MemberProfileSkeleton />
                <StudyRoomRuleSkeleton />
              </>
            ) : (
              <>
                <MemberProfile
                  studyRoomId={studyRoomId}
                  leader={leader}
                  members={members}
                  studyRecruit={studyRecruit}
                  recruitLoading={recruitLoading}
                  onRecruitWrite={() => setShowRecruitModal(true)}
                  onRefresh={fetchStudyRoom}
                />
                <StudyRoomRule rule={studyRoom.rule} />
              </>
            )}
          </div>
          <div className="flex justify-center items-center font-bold w-full max-w-[1000px] rounded-2xl dark:bg-zinc-500 dark:text-white shadow-[0_0_6px_rgba(0,0,0,0.1)] p-4 mx-auto">
            🔔{" "}
            {showSkeleton ? (
              <Skeleton width={200} height={25} />
            ) : (
              studyRoom.notice || "오늘의 공지는 없습니다!"
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-6">
        {/* 탭 버튼들 */}
        <button
          onClick={() => setActiveTab("note")}
          className={`flex flex-col items-center justify-center rounded-2xl shadow-sm w-[100px] h-[100px] transition-all duration-300 space-y-1 cursor-pointer
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
          className={`flex flex-col items-center justify-center rounded-2xl w-[100px] h-[100px] shadow-sm transition-all duration-300 space-y-1 cursor-pointer
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
          onClick={() => navigate(`/video-room/preview/${studyRoomId}`)}
          className="flex flex-col items-center justify-center rounded-2xl w-[100px] h-[100px] shadow-sm transition-all duration-300 space-y-1 bg-pink-100 hover:bg-pink-200 hover:scale-105 cursor-pointer"
        >
          <div className="text-3xl">🎦</div>
          <p className="text-sm font-semibold">채팅방 생성</p>
        </button>

        <button
          onClick={() => setEditModalOpen(true)}
          className="flex flex-col items-center justify-center rounded-2xl w-[100px] h-[100px] shadow-sm transition-all duration-300 space-y-1 bg-pink-100 hover:bg-pink-200 hover:scale-105 cursor-pointer"
        >
          <div className="text-3xl">🛠️</div>
          <p className="text-sm font-semibold">스터디방 수정</p>
        </button>
      </div>

      <StudyRoomEditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSuccess={fetchStudyRoom}
        roomId={studyRoom?.id}
      />

      {/* 아래 영역: 탭별로 컴포넌트 바꿔치기 */}
      <div className="w-full max-w-[1000px] dark:bg-zinc-500 flex flex-col rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] p-4 gap-4 mt-4">
        {activeTab === "note" &&
          (showSkeleton ? (
            <StudyNoteSkeleteon />
          ) : (
            <StudyNote studyRoomId={studyRoom.id} />
          ))}
        {activeTab === "chat" && <StudyChat />}
      </div>

      {/* === 구인글/지원자 모달 === */}
      <StudyRecruitFormModal
        leaderId={leader.userId}
        open={showRecruitModal}
        onClose={() => setShowRecruitModal(false)}
        studyRoomId={studyRoom.id}
        studyRecruit={studyRecruit}
        onSuccess={handleRecruitSuccess}
        onMemberChanged={fetchStudyRoom}
      />
    </div>
  );
}
