import { useLocation, useOutletContext } from "react-router-dom";
import ChatRoom from "../../components/chat/room/ChatRoom";

export default function ChattingPage() {
  const { refreshRooms, rooms } = useOutletContext();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const roomId = Number(query.get("roomId"));
  const stateOtherUser = location.state?.otherUser;

  // rooms에서 해당 roomId에 맞는 room을 찾는다
  const matchedRoom = rooms?.find((room) => room.roomId === roomId);
  const fallbackOtherUser = matchedRoom?.otherUser;

  const otherUser = stateOtherUser || fallbackOtherUser;

  return (
    <div className="flex items-center justify-center w-full h-full min-h-[800px] dark:bg-zinc-900 ">
      {roomId ? (
        <ChatRoom
          roomId={roomId}
          otherUser={otherUser}
          refreshRooms={refreshRooms}
        />
      ) : (
        <div className="pt-10 flex justify-center items-center w-full h-full text-gray-500">
          <p className="font-bold">채팅방을 선택해주세요!</p>
        </div>
      )}
    </div>
  );
}
