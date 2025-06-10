import { useEffect, useState } from "react";
import chatRoomApi from "../../../api/chatRoomAPI";
import ChatRoomItem from "./ChatRoomItem";

function ChatRoomList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    chatRoomApi.getAllSummaries().then(setRooms);
  }, []);

  return (
    <ul className="space-y-3">
      {rooms.map((room) => (
        <ChatRoomItem key={room.roomId} room={room} />
      ))}
    </ul>
  );
}

export default ChatRoomList;
