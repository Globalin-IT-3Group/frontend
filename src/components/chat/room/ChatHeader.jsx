export default function ChatHeader({ otherUser }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 border-b border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800">
      <img
        src={otherUser?.profileImage || "/default-profile.png"}
        alt="profile"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="text-base font-semibold dark:text-white">
        {otherUser?.nickname || "상대방"}
      </div>
    </div>
  );
}
