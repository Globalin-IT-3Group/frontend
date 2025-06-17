import { useEffect, useState } from "react";
import chatRoomApi from "../../../api/chatRoomAPI";
import ChatRoomItem from "./ChatRoomItem";

function ChatRoomList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    chatRoomApi.getAllSummaries().then(setRooms);
  }, []);

  // 💡 읽음처리 후에도 리스트를 새로고침해야 1이 사라짐!
  // 아래처럼 prop으로 refreshRooms 같은 함수를 내려보내
  // 채팅방에 들어가면 다시 불러오도록 할 수도 있음

  return (
    <ul className="space-y-3 w-60 flex flex-col">
      {rooms.map((room) => (
        <ChatRoomItem
          key={room.roomId}
          room={room}
          refreshRooms={() => chatRoomApi.getAllSummaries().then(setRooms)}
        />
      ))}
    </ul>
  );
}

export default ChatRoomList;
