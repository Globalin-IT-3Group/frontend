import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import userAPI from "../../api/userAPI";

export default function FindEmailForm() {
  const [phone1, setPhone1] = useState("010");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");
  const [question, setQuestion] = useState("나의 보물 1호는?");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const FindEmailSuccessAlert = (email) => {
    Swal.fire({
      title: "이메일 찾기 성공!",
      text: `회원님의 이메일은 ${email}입니다`,

      imageUrl: "/success.svg",
      imageWidth: 120,
      imageHeight: 120,

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

  const FindEmailFailAlert = (message) => {
    Swal.fire({
      title: "이메일 찾기 실패",
      text: `${message} 다시 시도해주세요!`,

      imageUrl: "/error.svg",
      imageWidth: 120,
      imageHeight: 120,

      showCancelButton: true,
      confirmButtonColor: "#003CFF",
      cancelButtonColor: "#D9D9D9",
      confirmButtonText: "다시 시도",
      cancelButtonText: "메인 페이지",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/find/email");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        navigate("/");
      }
    });
  };

  const handleFindEmail = async () => {
    const phoneNumber = phone1 + phone2 + phone3;

    const userData = {
      phoneNumber,
      question,
      answer,
    };

    try {
      const result = await userAPI.findEmail(userData);
      FindEmailSuccessAlert(result.data);
    } catch (error) {
      console.error(error);
      FindEmailFailAlert(error.response.data.message);
    }
  };

  return (
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
            maxLength={4}
            className="border border-gray-300 px-2 py-3 rounded-xl w-64"
          />
          <input
            value={phone3}
            onChange={(e) => setPhone3(e.target.value)}
            maxLength={4}
            className="border border-gray-300 px-2 py-3 rounded-xl w-64"
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
          className="w-full px-4 py-3 border border-[#CBCBCB] rounded-xl"
        />
      </div>

      <button
        onClick={handleFindEmail}
        className="w-[240px] bg-[#003CFF] flex justify-center mx-auto px-6 py-3 rounded-3xl text-lg text-white font-bold hover:bg-[#0536D7] transition-all duration-90 mt-20 mb-10 cursor-pointer"
      >
        이메일 찾기
      </button>
    </div>
  );
}
