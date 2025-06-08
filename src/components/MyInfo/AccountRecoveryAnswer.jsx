export default function AccountRecoveryAnswer() {
  return (
    <div className="flex items-center gap-4">
      <label className="w-[180px] text-xl font-bold">계정 복구 답변</label>
      <input
        type="text"
        className="flex-1 px-4 py-2 text-lg"
        defaultValue="글로벌인"
        readOnly
      />
    </div>
  );
}
