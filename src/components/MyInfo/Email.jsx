export default function Email({ email }) {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-8 flex-wrap sm:flex-nowrap">
        <label className="w-full sm:w-[193px] text-base sm:text-lg md:text-xl font-bold whitespace-nowrap">
          이메일
        </label>
        <input
          type="email"
          className="flex-1 py-2 text-base sm:text-lg "
          defaultValue={email}
          readOnly
        />
      </div>
    </div>
  );
}
