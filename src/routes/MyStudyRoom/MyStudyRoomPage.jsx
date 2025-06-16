import MemberProfile from "../../components/MyStudyRoom/MemberProfile";
import SturdyroomRule from "../../components/MyStudyRoom/StudyroomRule";
import { IoChatbubbleEllipses } from "react-icons/io5";

export default function MyStudyRoomPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4 py-4 gap-8">
      <div>
        <h1 className="text-4xl font-bold mx-auto mt-6 mb-10">내 스터디방</h1>
      </div>
      <div className="rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] p-4">
        <div className="flex flex-col justify-center mx-auto gap-4 w-full">
          <div className="flex justify-center mx-auto gap-4">
            <MemberProfile />
            <SturdyroomRule />
          </div>
          <div className="flex justify-center font-bold w-full rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] p-4 mx-auto">
            🔔 오늘의 공지는 없습니다!
          </div>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="flex flex-col cursor-pointer inline-flex items-center justify-center bg-pink-100 rounded-2xl p-4  shadow-sm  hover:text-white hover:bg-pink-200 hover:scale-105 transition-all duration-300 space-y-1">
          <div className="text-3xl">📒</div>
          <p className="text-sm font-semibold">스터디 노트</p>
        </div>

        <div className="flex flex-col cursor-pointer inline-flex items-center justify-center bg-pink-100 rounded-2xl py-4 px-5 shadow-sm  hover:text-white hover:bg-pink-200 hover:scale-105  transition-all duration-300 space-y-1 ">
          <div className="text-3xl text-blue">
            <IoChatbubbleEllipses className="text-orange-500" />
          </div>
          <p className="text-sm font-semibold">채팅 참여</p>
        </div>
        <div className="flex flex-col cursor-pointer inline-flex items-center justify-center bg-pink-100 rounded-2xl p-4 hover:text-white shadow-sm hover:bg-pink-200 hover:scale-105 transition-all duration-300 space-y-1">
          <div className="text-3xl">🎦</div>
          <p className="text-sm font-semibold">채팅방 생성</p>
        </div>
      </div>
      <div className="w-[1000px] flex flex-col rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] p-4 gap-4">
        <div className="flex justify-center font-bold w-full h-[400px] rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] p-4 mx-auto">
          ddd
        </div>
      </div>
    </div>
  );
}
