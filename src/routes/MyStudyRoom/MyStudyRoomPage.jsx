import MemberProfile from "../../components/MyStudyRoom/MemberProfile";
import SturdyroomRule from "../../components/MyStudyRoom/StudyroomRule";

export default function MyStudyRoomPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4 py-4 gap-8">
      <div>
        <h1 className="text-4xl font-bold mx-auto mt-10 mb-10">내 스터디방</h1>
      </div>
      <div className="rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] p-4">
        <div className="flex justify-center mx-auto gap-4">
          <MemberProfile />
          <SturdyroomRule />
        </div>
      </div>
      <div className="rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] p-4">
        <div className="flex justify-center font-bold w-[920px] rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] p-4 mx-auto">
          오늘의 공지는 없습니다!
        </div>
      </div>
    </div>
  );
}
