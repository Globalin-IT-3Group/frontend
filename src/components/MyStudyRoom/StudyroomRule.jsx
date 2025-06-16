export default function SturdyroomRule() {
  return (
    <div className="w-[500px] h-[255px] rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col p-6">
        <div className="flex items-center gap-x-4 mb-3">
          <span className="inline-flex items-center justify-center bg-yellow-100 rounded-full p-2 text-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] ">
            📢
          </span>
          <span className="text-xl font-bold">스터디방 규칙</span>
        </div>
        <ul className="flex flex-col gap-3 ml-16">
          <li>주2회 이상 참여</li>
          <li>예습 복습 철저히!</li>
          <li>JLPT 스터디는 매주 화요일만 진행합니다</li>
        </ul>
      </div>
    </div>
  );
}
