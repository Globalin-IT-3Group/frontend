import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function FindEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [phone1, setPhone1] = useState("010");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");
  const [question, setQuestion] = useState("나의 보물 1호는?");
  const [answer, setAnswer] = useState("");

  const handleFindEmail = () => {
    const phoneNumber = phone1 + phone2 + phone3;

    if (
      phoneNumber === "01012345678" &&
      question === "나의 보물 1호는?" &&
      answer === "노트북"
    ) {
      navigate("/find/email/success", {
        state: { email: "kotsu@example.com" },
      });
    } else {
      navigate("/find/email/fail");
    }
  };

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
                휴대폰 번호
              </label>
              <div className="flex gap-2 w-full">
                <select
                  value={phone1}
                  onChange={(e) => setPhone1(e.target.value)}
                  className="border border-gray-300 px-3 py-3 rounded-xl"
                >
                  <option>010</option>
                  <option>011</option>
                  <option>016</option>
                  <option>017</option>
                  <option>018</option>
                  <option>019</option>
                </select>
                <input
                  value={phone2}
                  onChange={(e) => setPhone2(e.target.value)}
                  className="border border-gray-300 px-2 py-3 rounded-xl w-64"
                  maxLength={4}
                />
                <input
                  value={phone3}
                  onChange={(e) => setPhone3(e.target.value)}
                  className="border border-gray-300 px-2 py-3 rounded-xl w-64"
                  maxLength={4}
                />
              </div>
            </div>
            <div>
              <label className="block text-md text-[#676767] font-bold mb-2">
                계정 복구 질문
              </label>
              <select
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="border border-gray-300 px-3 py-3 rounded-xl w-full"
              >
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
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full px-4 py-3 border border-[#CBCBCB] placeholder-[#CBCBCB] rounded-xl"
              />
            </div>
            <button
              onClick={handleFindEmail}
              className="w-[240px] bg-[#003CFF] flex justify-center mx-auto px-6 py-3 rounded-3xl text-lg text-white font-bold hover:bg-[#0536D7] transition-all duration-90 mt-20 mb-10"
            >
              이메일 찾기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
