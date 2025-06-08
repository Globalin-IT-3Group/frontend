export default function Email() {
  return (
    <div className="flex items-center gap-4">
      <label className="w-[180px] text-xl font-bold">이메일</label>
      <input
        type="email"
        className="flex-1 px-4 py-2 text-lg"
        defaultValue="kotsu@example.com"
        readOnly
      />
    </div>
  );
}
