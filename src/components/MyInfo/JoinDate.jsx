export default function JoinDate() {
  return (
    <div className="flex items-center gap-8">
      <label className="w-[180px] text-xl font-bold">가입 일시</label>
      <input
        type="text"
        className="flex-1 px-4 py-2 text-lg"
        defaultValue="2025-06-08 19:26"
        readOnly
      />
    </div>
  );
}
