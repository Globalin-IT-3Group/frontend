export default function ChatHeader({ otherUser }) {
  return (
    <div className="flex items-center gap-4 px-1 my-4 border-gray-300 rounded-xl dark:border-zinc-600 bg-white dark:bg-zinc-800">
      <img
        src={otherUser?.profileImage || "/default-profile.png"}
        alt="profile"
        className="w-14 h-14 rounded-full object-cover"
      />
      <div className="text-2xl md:text-2xl font-semibold dark:text-white">
        {otherUser?.nickname || "상대방"}
      </div>
    </div>
  );
}
