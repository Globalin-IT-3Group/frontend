export default function RecruitBoxContainer({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-4xl w-[500px] h-[350px] mx-auto m-6 shadow-[0_0_6px_rgba(0,0,0,0.1)] flex flex-col ${className}`}
    >
      <div className="p-10 overflow-auto h-full w-full">{children}</div>
    </div>
  );
}
