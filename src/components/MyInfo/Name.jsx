export default function name() {
  return (
    <div className="flex items-center gap-8">
      <label className="w-[180px] text-xl font-bold">이름</label>
      <input
        type="text"
        className="flex-1 px-4 py-2 text-lg"
        defaultValue="서지민"
        readOnly
      />
    </div>
  );
}
