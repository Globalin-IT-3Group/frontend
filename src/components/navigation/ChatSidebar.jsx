import { Link, useNavigate } from "react-router-dom";
import ChatRoomList from "../chat/sidebar/ChatRoomList";
import { MdHome } from "react-icons/md";

function ChatSidebar({ rooms, refreshRooms }) {
  const navigate = useNavigate();

  const handleRoomClick = (roomId) => {
    navigate(`/chat?roomId=${roomId}`);
  };

  return (
    <div className="h-full p-4 dark:text-white border-r border-gray-300">
      <div className="flex gap-3 p-2 items-center justify-between">
        <h2 className="text-xl font-bold mb-4">💬 채팅방</h2>
        <Link to="/main">
          <MdHome
            size={20}
            className="mb-4 text-gray-600 hover:scale-120 hover:text-gray-800 transition duration-300"
          />
        </Link>
      </div>
      <ChatRoomList
        rooms={rooms}
        refreshRooms={refreshRooms}
        onClickRoom={handleRoomClick}
      />
    </div>
  );
}

export default ChatSidebar;
