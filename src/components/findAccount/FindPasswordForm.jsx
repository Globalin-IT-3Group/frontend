import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import userAPI from "../../api/userAPI";

export default function FindPasswordForm() {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("나의 보물 1호는?");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const FindPassSuccessAlert = (password) => {
    Swal.fire({
      title: "비밀번호 찾기 성공!",
      text: `회원님의 비밀번호는는 ${password}입니다`,

      imageUrl: "/success.svg",
      imageWidth: 180,
      imageHeight: 180,

      showCancelButton: false,
      confirmButtonColor: "#003CFF",
      cancelButtonColor: "#D9D9D9",
      confirmButtonText: "로그인",
      cancelButtonText: "메인 페이지",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  };

  const FindPassFailAlert = (message) => {
    Swal.fire({
      title: "비밀번호 찾기 실패",
      text: `${message} 다시 시도해주세요!`,

      imageUrl: "/fail.svg",
      imageWidth: 180,
      imageHeight: 180,

      showCancelButton: true,
      confirmButtonColor: "#003CFF",
      cancelButtonColor: "#D9D9D9",
      confirmButtonText: "다시 시도",
      cancelButtonText: "메인 페이지",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/find/password");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        navigate("/");
      }
    });
  };

  const handleFindPassword = async () => {
    const userData = {
      email,
      question,
      answer,
    };

    try {
      const result = await userAPI.findPassword(userData);
      FindPassSuccessAlert(result.data);
    } catch (error) {
      console.error(error);
      FindPassFailAlert(error.response.data.message);
    }
  };

  return (
    <div className="w-[600px] mt-10 mx-auto space-y-12">
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
          className="w-full px-4 py-3 border border-[#CBCBCB] rounded-xl"
        />
      </div>

      <button
        onClick={handleFindPassword}
        className="w-[240px] bg-[#003CFF] flex justify-center mx-auto px-6 py-3 rounded-3xl text-lg text-white font-bold hover:bg-[#0536D7] transition-all duration-90 mt-20 mb-10"
      >
        비밀번호 찾기
      </button>
    </div>
  );
}
