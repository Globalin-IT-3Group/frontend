export default function CheckPassword() {
  return (
    <div className="flex items-center gap-4">
      <label className="w-[180px] text-xl font-bold">비밀번호 확인</label>
      <input
        type="password"
        className="w-[255px] px-4 py-2 text-lg border border-gray-300 rounded-xl"
        defaultValue="********"
      />
    </div>
  );
}
