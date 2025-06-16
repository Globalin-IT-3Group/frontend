export default function MemberProfile() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-[400px] h-[120px] bg-blue-100 rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-center p-4 gap-4">
          <img
            src="/6.jpg"
            alt="leader"
            className="w-18 h-18 rounded-full shadow-[0_0_6px_rgba(0,0,0,0.1)] object-cover"
          />
          <p className="font-bold text-lg">leader</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-x-10 w-[400px] h-[120px] bg-gray-100 rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col items-center">
          <img
            src="/6.jpg"
            alt="leader"
            className="w-14 h-14 rounded-full shadow-[0_0_6px_rgba(0,0,0,0.1)] object-cover"
          />
          <p className="font-bold text-sm">member1</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img
            src="/6.jpg"
            alt="leader"
            className="w-14 h-14 rounded-full shadow-[0_0_6px_rgba(0,0,0,0.1)] object-cover"
          />
          <p className="font-bold text-sm">member2</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img
            src="/6.jpg"
            alt="leader"
            className="w-14 h-14 rounded-full shadow-[0_0_6px_rgba(0,0,0,0.1)] object-cover"
          />
          <p className="font-bold text-sm">member3</p>
        </div>
      </div>
    </div>
  );
}
