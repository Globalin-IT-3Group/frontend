import ChatRoomItem from "./ChatRoomItem";

function ChatRoomList({ rooms, refreshRooms, onClickRoom }) {
  return (
    <ul>
      {rooms.map((room) => (
        <ChatRoomItem
          key={room.roomId}
          room={room}
          refreshRooms={refreshRooms}
          onClickRoom={onClickRoom}
        />
      ))}
    </ul>
  );
}
export default ChatRoomList;
