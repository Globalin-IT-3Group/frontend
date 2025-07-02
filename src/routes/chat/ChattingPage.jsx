import { useLocation, useOutletContext } from "react-router-dom";
import ChatRoom from "../../components/chat/room/ChatRoom";
import GroupChatRoom from "../../components/chat/room/GroupChatRoom";

export default function ChattingPage() {
  const { refreshRooms, rooms } = useOutletContext();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const roomId = Number(query.get("roomId"));

  // rooms에서 해당 roomId에 맞는 room을 찾는다
  const matchedRoom = rooms?.find((room) => room.roomId === roomId);

  return (
    <div className="flex items-center justify-center w-full min-h-[660px] px-2 dark:bg-zinc-800">
      {roomId && matchedRoom ? (
        matchedRoom.roomType === "GROUP" ? (
          <GroupChatRoom
            roomId={roomId}
            matchedRoom={matchedRoom}
            refreshRooms={refreshRooms}
          />
        ) : (
          <ChatRoom
            roomId={roomId}
            matchedRoom={matchedRoom}
            refreshRooms={refreshRooms}
          />
        )
      ) : (
        <div className="pt-10 flex justify-center items-center w-full h-full text-gray-500 dark:text-gray-400">
          <p className="font-bold">채팅방을 선택해주세요!</p>
        </div>
      )}
    </div>
  );
}
