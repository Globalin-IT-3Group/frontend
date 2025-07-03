import { useSelector } from "react-redux";

export default function ChatHeader({ matchedRoom }) {
  const { roomType, studyRoomName, studyRoomImageUrl, otherUsers } =
    matchedRoom;

  const user = useSelector((state) => state.auth);
  const myUserId = user.id;

  // SINGLE일 경우 otherUser 참조
  const otherUser = roomType === "SINGLE" ? otherUsers?.[0] : null;

  // 이미지 결정
  const profileImage =
    roomType === "GROUP"
      ? studyRoomImageUrl || "/default-profile.png"
      : otherUser?.profileImage || "/default-profile.png";

  const getMemberCount = () => {
    if (roomType !== "GROUP") return null;

    const others = otherUsers || [];
    if (others.length === 1) {
      return others[0]?.id === myUserId ? 1 : 2;
    }

    return others.length + 1;
  };

  const displayName =
    roomType === "GROUP"
      ? `${studyRoomName || "그룹 채팅"} (${getMemberCount()}명)`
      : otherUser?.nickname || "상대방";

  return (
    <div className="flex items-center gap-4 px-1 my-4 border-gray-300 rounded-xl dark:border-zinc-600 bg-white dark:bg-zinc-700">
      <img
        src={profileImage}
        alt="profile"
        className="w-14 h-14 rounded-full object-cover"
      />
      <div className="text-2xl md:text-2xl font-semibold dark:text-white">
        {displayName}
      </div>
    </div>
  );
}
