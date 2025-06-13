export default function AccountRecovertQuestion({ question }) {
  return (
    <div className="flex items-center gap-8">
      <label className="w-[180px] text-xl font-bold">계정 복구 질문</label>
      <input
        type="text"
        className="flex-1 px-4 py-2 text-lg"
        defaultValue={question}
        readOnly
      />
    </div>
  );
}
