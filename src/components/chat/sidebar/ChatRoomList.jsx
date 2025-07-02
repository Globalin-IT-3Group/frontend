import ChatRoomItem from "./ChatRoomItem";

function ChatRoomList({ rooms, refreshRooms, onClickRoom, myUserId }) {
  return (
    <ul>
      {rooms.map((room) => (
        <ChatRoomItem
          key={room.roomId}
          room={room}
          myUserId={myUserId}
          refreshRooms={refreshRooms}
          onClickRoom={onClickRoom}
        />
      ))}
    </ul>
  );
}
export default ChatRoomList;
