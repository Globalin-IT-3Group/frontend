export default function StudyRoomRule({ rule }) {
  // rule: 규칙 문자열 (줄바꿈, <br> 등 처리 원하면 별도 가공)
  return (
    <div className="w-full h-[255px] rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col p-6">
        <div className="flex items-center gap-x-4 mb-3">
          <span className="inline-flex items-center justify-center bg-yellow-100 rounded-full p-2 text-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] ">
            📢
          </span>
          <span className="text-xl font-bold">스터디방 규칙</span>
        </div>
        <div className="ml-16 text-base text-gray-700 whitespace-pre-line">
          {rule || "아직 규칙이 입력되지 않았어요."}
        </div>
      </div>
    </div>
  );
}
