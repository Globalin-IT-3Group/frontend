import { Link, useNavigate } from "react-router-dom";
import ChatRoomList from "../chat/sidebar/ChatRoomList";
import { IoMenu } from "react-icons/io5";

function MobileChatSidebar({ rooms, refreshRooms, onClose }) {
  const navigate = useNavigate();

  const handleRoomClick = (roomId) => {
    navigate(`/chat?roomId=${roomId}`);
    if (onClose) onClose();
  };

  return (
    <div className="h-full p-4 dark:text-white bg-white dark:bg-zinc-700 shadow-xl">
      <div className="flex gap-3 p-1 items-center justify-between mb-4">
        <h2 className="text-lg font-semibold dark:text-white">💬 채팅방</h2>
        <Link to="/main">
          <IoMenu
            size={22}
            className="text-gray-600 hover:scale-110 hover:text-gray-800 dark:hover:text-gray-300 transition duration-300 dark:text-white"
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

export default MobileChatSidebar;
