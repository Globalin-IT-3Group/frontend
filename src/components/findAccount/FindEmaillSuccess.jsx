import { Check } from "lucide-react";

export default function FindEmailSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-4xl w-[1400px] h-auto p-10 m-16 shadow-[0_0_6px_rgba(0,0,0,0.1)] overflow-y-auto flex flex-col">
        <div className="flex flex-col items-center mx-auto p-8">
          <div className="w-20 h-20 rounded-full bg-white border border-[#003CFF] border-4 flex items-center justify-center">
            <Check className="text-[#003CFF] w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold mt-12 mb-4">회원님의 이메일은</h1>
          <div>
            <span className="text-3xl text-[#003CFF] font-bold">
              kotsu@example.com
            </span>
            <span className="text-2xl font-bold"> 입니다.</span>
          </div>
          <button className="w-[200px] bg-[#003CFF] flex justify-center mx-auto px-6 py-3 rounded-3xl text-lg text-white font-bold hover:bg-[#0536D7] transition-all duration-90 mt-26">
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
