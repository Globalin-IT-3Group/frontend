import { useRef, useEffect, useState } from "react";
import { Eye } from "lucide-react";

export default function StudyRecruitModal({
  roomName,
  studyExplain,
  profileImage,
  leader,
  createdAt,
  viewCount,
  userCount,
  onClose,
  onRequestFormOpen,
}) {
  const formatDateToLocalString = (dateString) => {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}/${mm}/${dd}`;
  };

  const scrollRef = useRef(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    const handleScroll = () => {
      const percent =
        (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollPercent(percent);
    };
    if (el) {
      el.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-gradient-to-b from-blue-100 to-white w-[700px] h-[600px] overflow-hidden rounded-4xl">
        <div className="relative z-10 flex flex-col items-center mx-auto p-6">
          <div className="flex justify-center w-full">
            <div className="flex flex-col items-center w-full rounded-3xl p-4 space-y-3">
              <h2 className="text-2xl font-bold break-words  text-center text-[#0033CF]">
                {roomName}
              </h2>

              <div className="flex items-center space-x-2">
                {profileImage && (
                  <img
                    src={profileImage}
                    alt={leader}
                    className="bg-black rounded-full w-6 h-6 object-cover"
                  />
                )}
                <p className="text-sm text-gray-500">{leader}</p>
              </div>

              <div className="flex items-center justify-between w-full">
                <div className="flex space-x-4">
                  <span className="text-xs text-gray-500 break-words">
                    {formatDateToLocalString(createdAt)} 작성
                  </span>
                  <span className="text-xs text-gray-500 font-semibold break-words">
                    {userCount}
                  </span>
                  <span className="flex gap-1 items-center text-xs text-gray-500 break-words">
                    <Eye size={11} />
                    {viewCount}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="bg-white border-[#0033CF] text-xs text-[#0033CF] rounded-2xl px-2 py-1 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
                    #회화
                  </span>
                  <span className="bg-white border-[#0033CF] text-xs text-[#0033CF] rounded-2xl px-2 py-1 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
                    #자격증
                  </span>
                  <span className="bg-white border-[#0033CF] text-xs text-[#0033CF] rounded-2xl px-2 py-1 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
                    #비즈니스일본어
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[650px] h-[300px] bg-white flex flex-col mb-2 mt-1 rounded-2xl p-8 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
            <div
              className="overflow-y-auto pr-2 scrollbar-hide"
              ref={scrollRef}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <p className="text-sm text-gray-600 break-words whitespace-pre-line">
                {studyExplain}
              </p>
            </div>
          </div>

          <div className="relative w-[650px] h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-2 bg-[#003CFF] transition-all duration-200"
              style={{ width: `${scrollPercent}%` }}
            ></div>
          </div>

          <div className="flex justify-center gap-x-4 mt-4">
            <button
              onClick={onRequestFormOpen}
              className="bg-[#003CFF] px-6 py-2 rounded-3xl text-md text-white font-bold hover:bg-[#0536D7] transition-all duration-200 cursor-pointer"
            >
              참여 신청
            </button>
            <button
              onClick={onClose}
              className="bg-white border border-gray-400 text-gray-400 px-8 py-2 rounded-3xl text-md font-bold hover:bg-gray-100 transition-all duration-200 cursor-pointer"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
