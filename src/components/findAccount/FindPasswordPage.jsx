import { Link, useLocation } from "react-router-dom";

export default function FindPasswordPage() {
  const location = useLocation();

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-4xl w-[1400px] h-auto p-10 m-16 shadow-[0_0_6px_rgba(0,0,0,0.1)] overflow-y-auto flex flex-col">
          <div className="flex justify-center mt-4 mx-auto p-4 gap-8">
            <Link to="/find/email">
              <h1
                className={`text-3xl font-bold ml-4 mb-8 ${
                  location.pathname === "/find/email"
                    ? "text-black"
                    : "text-gray-400"
                }`}
              >
                이메일 찾기
              </h1>
            </Link>
            <Link to="/find/password">
              <h1
                className={`text-3xl font-bold ml-4 mb-8 ${
                  location.pathname === "/find/password"
                    ? "text-black"
                    : "text-gray-400"
                }`}
              >
                비밀번호 찾기
              </h1>
            </Link>
          </div>

          <div className="w-[600px] mt-10 mx-auto space-y-12">
            <div>
              <label className="block text-md text-[#676767] font-bold mb-2">
                이메일
              </label>
              <input
                type="email"
                placeholder="kotsu@example.com"
                className="w-full px-4 py-3 border border-[#CBCBCB] placeholder-[#CBCBCB] rounded-xl"
              />
            </div>
            <div>
              <label className="block text-md text-[#676767] font-bold mb-2">
                계정 복구 질문
              </label>
              <select className="border border-gray-300 px-3 py-3 rounded-xl w-full">
                <option>나의 보물 1호는?</option>
                <option>나의 출신 초등학교는?</option>
                <option>나의 출신 고향은?</option>
                <option>어머니 성함은?</option>
                <option>아버지 성함은?</option>
                <option>가장 좋아하는 색깔은?</option>
                <option>가장 좋아하는 음식은?</option>
              </select>
            </div>
            <div>
              <label className="block text-md text-[#676767] font-bold mb-2">
                계정 복구 답변
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-[#CBCBCB] placeholder-[#CBCBCB] rounded-xl"
              />
            </div>
            <button className="w-[240px] bg-[#003CFF] flex justify-center mx-auto px-6 py-3 rounded-3xl text-lg text-white font-bold hover:bg-[#0536D7] transition-all duration-90 mt-20 mb-10">
              비밀번호 찾기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
