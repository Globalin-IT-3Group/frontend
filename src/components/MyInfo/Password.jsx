export default function Password() {
  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-8">
        <label className="w-[180px] text-xl font-bold">비밀번호</label>
        <input
          type="password"
          className="flex px-4 py-2 text-lg border border-gray-300 rounded-xl"
          defaultValue="********"
        />
      </div>
      <button className="min-w-[72px] px-4 py-2 bg-[#003CFF] text-white rounded-2xl font-bold hover:bg-[#0536D7] transition">
        변경
      </button>
    </div>
  );
}
