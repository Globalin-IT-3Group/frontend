export default function Nickname() {
  return (
    <div className="flex items-center gap-4">
      <label className="w-[180px] text-xl font-bold">별명</label>
      <input
        type="text"
        className="flex-1 px-4 py-2 text-lg border border-gray-300 rounded-xl"
        defaultValue="감바"
      />
      <button className="min-w-[72px] px-4 py-2 bg-[#5500ff] text-white rounded-xl font-bold hover:bg-[#4600D1] transition">
        변경
      </button>
    </div>
  );
}
