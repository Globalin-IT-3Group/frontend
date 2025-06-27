import { FaStar } from "react-icons/fa6";
import { PiNotePencilLight, PiNoteFill } from "react-icons/pi";
import { FaUserCog } from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import MemberListModal from "./MemberListModal";

export default function MemberProfile({
  studyRoomId,
  leader,
  members,
  studyRecruit,
  recruitLoading,
  onRecruitWrite,
  onRefresh,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const user = useSelector((state) => state.auth);

  return (
    <div className="flex w-full flex-col gap-4 relative w-fit">
      {/* 방장 */}
      <div className="flex h-[120px] bg-blue-100 rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)]">
        <div className="flex w-1/2 items-center justify-start px-7 gap-4">
          <img
            src={leader?.profileImageUrl || "/default.jpg"}
            alt="leader"
            className="w-full max-w-[70px] h-full max-h-[70px] rounded-full shadow-[0_0_6px_rgba(0,0,0,0.1)] object-cover"
          />
          <div className="flex items-center gap-2">
            <span className="bg-white/70 rounded-full p-1 text-yellow-400 text-xl">
              <FaStar />
            </span>
            <p className="font-bold text-lg whitespace-nowrap">
              {leader?.nickname || "방장"}
            </p>
          </div>
        </div>
        {/* 구인 버튼 */}
        <div className="absolute right-4 top-4 flex flex-col items-center space-y-2">
          <button
            onClick={onRecruitWrite}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-bold shadow transition flex items-center gap-2 cursor-pointer "
            title={studyRecruit ? "구인 폼 수정" : "구인 폼 작성"}
            disabled={recruitLoading}
          >
            {studyRecruit ? (
              <>
                <PiNoteFill size={20} /> 구인
              </>
            ) : (
              <>
                <PiNotePencilLight size={20} /> 구인
              </>
            )}
          </button>
        </div>
      </div>
      {/* 멤버 */}
      <div className="relative w-full">
        {/* 우측 상단 버튼 */}
        <button
          className="absolute right-4 top-4 text-2xl text-gray-400 hover:text-blue-600 transition z-10"
          onClick={() => setModalOpen(true)}
          aria-label="멤버 관리"
        >
          <FaUserCog />
        </button>

        <div className="flex items-center justify-center gap-x-10 h-[120px] bg-gray-100 dark:bg-zinc-400 rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)]">
          {members && members.length > 0 ? (
            members.map((m) => (
              <div key={m.userId} className="flex flex-col items-center">
                <img
                  src={m.profileImageUrl || "/default.jpg"}
                  alt={m.nickname}
                  className="w-14 h-14 rounded-full shadow-[0_0_6px_rgba(0,0,0,0.1)] object-cover"
                />
                <p className="font-bold text-sm">{m.nickname}</p>
              </div>
            ))
          ) : (
            <span className="text-gray-400 dark:text-white">
              아직 멤버가 없습니다
            </span>
          )}
        </div>
        {/* 멤버 모달 */}
        <MemberListModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          members={members}
          myUserId={user.id}
          studyRoomId={studyRoomId}
          onRefresh={onRefresh}
        />
      </div>
    </div>
  );
}
