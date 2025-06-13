export default function JoinDate({ createdAt }) {
  // "2025-06-13T17:03:26.827841" → "2025-06-13"
  const dateStr = createdAt ? createdAt.split("T")[0] : "";

  return (
    <div className="flex items-center gap-8">
      <label className="w-[180px] text-xl font-bold">가입 일시</label>
      <input
        type="text"
        className="flex-1 px-4 py-2 text-lg"
        value={dateStr}
        readOnly
      />
    </div>
  );
}
