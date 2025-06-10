import Navbar from "../navigation/Navbar";

export default function JoinPage() {
  return (
    <div className="min-h-screen w-full overflow-auto">
      <div className="flex flex-col items-center justify-start">
        <div className="bg-white rounded-4xl w-full max-w-[1400px] p-10 my-16 shadow-[0_0_6px_rgba(0,0,0,0.1)] flex flex-col">
          <h2 className="text-3xl font-bold flex justify-center mt-14">
            회원가입
          </h2>
          <div className="w-full max-w-[900px] mx-auto">
            <div className="h-px bg-gray-200 mt-16" />
            <p className="text-sm text-gray-500 text-right mt-4">
              *는 필수 입력 항목
            </p>
          </div>

          <div className="w-full max-w-[800px] mx-auto mt-10">
            <form className="grid grid-cols-1 md:grid-cols-[150px_1fr_140px] gap-y-12 gap-x-8 w-full mx-auto mt-10 ml-0 md:ml-14">
              <label className="font-bold text-lg">
                이메일 <span className="text-red-500">*</span>
              </label>

              <input
                type="email"
                className="border border-gray-300 px-3 py-2 rounded-xl w-full"
                placeholder="example@email.com"
              />
              <div></div>

              <label className="font-bold text-lg">
                비밀번호 <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className="border border-gray-300 px-3 py-2 rounded-xl w-full"
                placeholder="영문 대소문자/숫자/특수문자 필수, 8~20자 이내"
              />
              <div></div>

              <label className="font-bold text-lg">
                비밀번호 확인 <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                className="border border-gray-300 px-3 py-2 rounded-xl w-full"
                placeholder="********"
              />
              <div></div>

              <label className="font-bold text-lg">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="border border-gray-300 px-3 py-2 rounded-xl w-full"
              />
              <div></div>

              <label className="font-bold text-lg">
                별명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="border border-gray-300 px-3 py-2 rounded-xl w-full"
              />
              <div></div>
              <label className="font-bold text-lg">
                휴대전화 <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <select className="border border-gray-300 px-2 py-1 rounded-xl">
                  <option>010</option>
                  <option>011</option>
                  <option>016</option>
                  <option>017</option>
                  <option>018</option>
                  <option>019</option>
                </select>
                <input className="border border-gray-300 px-2 py-1 rounded-xl w-24" />
                <input className="border border-gray-300 px-2 py-1 rounded-xl w-24" />
              </div>
              <div></div>
              <label className="font-bold text-lg">
                계정 복구 질문 <span className="text-red-500">*</span>
              </label>
              <select className="border border-gray-300 px-3 py-2 rounded-xl w-full">
                <option>나의 보물 1호는?</option>
                <option>나의 출신 초등학교는?</option>
                <option>나의 출신 고향은?</option>
                <option>어머니 성함은?</option>
                <option>아버지 성함은?</option>
                <option>가장 좋아하는 색깔은?</option>
                <option>가장 좋아하는 음식은?</option>
              </select>
              <div></div>
              <label className="font-bold text-lg">
                계정 복구 답변 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="border border-gray-300 px-3 py-2 rounded-xl w-full"
              />
              <div></div>
            </form>
          </div>
          <div className="flex mx-auto mt-36 gap-4 m-10">
            <button className="bg-[#003CFF] px-8 py-2 rounded-3xl text-lg text-white font-bold hover:bg-[#0536D7] transition-all duration-90">
              회원가입
            </button>
            <button className="bg-white border border-gray-400 text-gray-400 px-12 py-2 rounded-3xl text-lg font-bold">
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
