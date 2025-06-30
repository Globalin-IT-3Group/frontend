export default function JoinDate({ createdAt }) {
  // "2025-06-13T17:03:26.827841" → "2025-06-13"
  const dateStr = createdAt ? createdAt.split("T")[0] : "";

  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-8 flex-wrap sm:flex-nowrap">
        <label className="w-full sm:w-[180px] text-base sm:text-lg md:text-xl font-bold whitespace-nowrap">
          가입 일시
        </label>
        <input
          type="text"
          className="flex-1  py-2 text-base sm:text-lg "
          value={dateStr}
          readOnly
        />
      </div>
    </div>
  );
}
