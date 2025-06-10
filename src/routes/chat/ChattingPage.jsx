import { useLocation } from "react-router-dom";
import ChatRoom from "../../components/chat/room/ChatRoom";

export default function ChattingPage() {
  const query = new URLSearchParams(useLocation().search);
  const roomId = Number(query.get("roomId"));
  const { state } = useLocation();
  const otherUser = state?.otherUser;

  return roomId ? (
    <ChatRoom roomId={roomId} otherUser={otherUser} />
  ) : (
    <div className="pt-10 flex justify-center items-center w-full h-full text-gray-500">
      <p className="text-bold">채팅방을 선택해주세요!</p>
    </div>
  );
}
