import { FaStar } from "react-icons/fa6";
import { PiNotePencilLight, PiNoteFill } from "react-icons/pi";

export default function MemberProfile({
  leader,
  members,
  studyRecruit,
  recruitLoading,
  onRecruitWrite,
}) {
  console.log(studyRecruit);

  return (
    <div className="flex flex-col gap-4 relative w-fit">
      {/* 방장 */}
      <div className="flex w-[450px] h-[120px] bg-blue-100 rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)]">
        {/* 프로필+별 겹침 레이아웃 */}
        <div className="w-1/2 flex items-center justify-center p-4 gap-4">
          <div className="relative">
            {/* ⭐ 좌측 상단 별 */}
            <span className="absolute -left-8 -top-3 bg-white/70 rounded-full p-1 text-yellow-400 text-xl shadow">
              <FaStar />
            </span>
            <img
              src={leader?.profileImageUrl || "/default.jpg"}
              alt="leader"
              className="w-18 h-18 rounded-full shadow-[0_0_6px_rgba(0,0,0,0.1)] object-cover"
            />
          </div>
          <p className="font-bold text-lg">{leader?.nickname || "방장"}</p>
        </div>
        {/* 구인 작성 버튼 */}
        <button
          onClick={onRecruitWrite}
          className="absolute right-4 top-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-bold shadow transition flex items-center gap-2 cursor-pointer"
          title={studyRecruit ? "구인 폼 수정" : "구인 폼 작성"}
          disabled={recruitLoading}
        >
          {studyRecruit ? (
            <>
              구인 <PiNoteFill size={20} />
            </>
          ) : (
            <>
              구인 <PiNotePencilLight size={20} />
            </>
          )}
        </button>
      </div>

      {/* 멤버 */}
      <div className="relative w-[450px]">
        <div className="flex items-center justify-center gap-x-10 h-[120px] bg-gray-100 rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)]">
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
            <span className="text-gray-400">아직 멤버가 없습니다</span>
          )}
        </div>
      </div>
    </div>
  );
}
