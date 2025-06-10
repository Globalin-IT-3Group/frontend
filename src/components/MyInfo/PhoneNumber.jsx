export default function PhoneNumber() {
  return (
    <div className="flex items-center gap-8">
      <label className="w-[180px] text-xl font-bold">전화번호</label>
      <input
        type="text"
        className="flex-1 px-4 py-2 text-lg"
        defaultValue="+82 10-****-****"
        readOnly
      />
    </div>
  );
}
