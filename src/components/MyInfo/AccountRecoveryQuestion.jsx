export default function AccountRecovertQuestion({ question }) {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-8 flex-wrap sm:flex-nowrap">
        <label className="w-full sm:w-[180px] text-base sm:text-lg md:text-xl font-bold whitespace-nowrap">
          계정 복구 질문
        </label>
        <input
          type="text"
          className="flex-1 py-2 text-base sm:text-lg"
          defaultValue={question}
          readOnly
        />
      </div>
    </div>
  );
}
