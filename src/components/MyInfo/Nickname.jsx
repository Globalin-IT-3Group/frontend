export default function Nickname() {
  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-8">
        <label className="w-[180px] text-xl font-bold">별명</label>
        <input
          type="text"
          className="flex px-4 py-2 text-lg border border-gray-300 rounded-xl"
          defaultValue="감바"
        />
      </div>
      <button className="min-w-[72px] px-4 py-2 bg-[#003CFF] text-white rounded-2xl font-bold hover:bg-[#0536D7] transition">
        변경
      </button>
    </div>
  );
}
