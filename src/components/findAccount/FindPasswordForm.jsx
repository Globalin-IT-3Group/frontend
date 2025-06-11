import { useState } from "react";

export default function FindPasswordForm() {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("나의 보물 1호는?");
  const [answer, setAnswer] = useState("");

  const handleFindPassword = () => {
    // TODO: 비밀번호 찾기 처리 로직 작성
    alert("비밀번호 찾기 로직은 아직 구현되지 않았습니다.");
  };

  return (
    <div className="w-[600px] mt-10 mx-auto space-y-12">
      {/* 이메일 */}
      <div>
        <label className="block text-md text-[#676767] font-bold mb-2">
          이메일
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="kotsu@example.com"
          className="w-full px-4 py-3 border border-[#CBCBCB] rounded-xl"
        />
      </div>

      {/* 복구 질문 */}
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

      {/* 복구 답변 */}
      <div>
        <label className="block text-md text-[#676767] font-bold mb-2">
          계정 복구 답변
        </label>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full px-4 py-3 border border-[#CBCBCB] rounded-xl"
        />
      </div>

      {/* 버튼 */}
      <button
        onClick={handleFindPassword}
        className="w-[240px] bg-[#003CFF] flex justify-center mx-auto px-6 py-3 rounded-3xl text-lg text-white font-bold hover:bg-[#0536D7] transition-all duration-90 mt-20 mb-10"
      >
        비밀번호 찾기
      </button>
    </div>
  );
}
