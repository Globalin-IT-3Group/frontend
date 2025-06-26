import { FaStar } from "react-icons/fa6";
import { PiNotePencilLight, PiNoteFill } from "react-icons/pi";

export default function MemberProfile({
  leader,
  members,
  studyRecruit,
  recruitLoading,
  onRecruitWrite,
}) {
  return (
    <div className="flex w-full flex-col gap-4 relative w-fit">
      {/* 방장 */}
      <div className="flex h-[120px] bg-blue-100 rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)]">
        <div className="flex w-1/2 items-center justify-center p-4 gap-4">
          <img
            src={leader?.profileImageUrl || "/default.jpg"}
            alt="leader"
            className="w-full max-w-[70px] h-auto rounded-full shadow-[0_0_6px_rgba(0,0,0,0.1)] object-cover"
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
      <div className="relative w-full">
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
      </div>
    </div>
  );
}
