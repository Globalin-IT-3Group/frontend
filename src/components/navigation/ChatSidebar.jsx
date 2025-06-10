import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import chatRoomApi from "../../api/chatRoomApi";
import ChatRoomList from "../chat/sidebar/ChatRoomList";

function ChatSidebar() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    chatRoomApi.getAllSummaries().then(setRooms);
  }, []);

  const handleRoomClick = (roomId) => {
    navigate(`/chat?roomId=${roomId}`);
  };

  return (
    <div className="h-full p-4 dark:text-white overflow-y-auto border-r border-gray-300">
      <h2 className="text-xl font-bold mb-4">💬 채팅방</h2>
      <ChatRoomList rooms={rooms} onClickRoom={handleRoomClick} />
    </div>
  );
}

export default ChatSidebar;
