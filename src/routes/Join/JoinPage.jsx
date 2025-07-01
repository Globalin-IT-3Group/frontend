import { useState } from "react";
import userAPI from "../../api/userAPI";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function JoinPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nickname, setNickname] = useState("");
  const [phone1, setPhone1] = useState("010");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");
  const [question, setQuestion] = useState("나의 보물 1호는?");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const JoinSuccessAlert = () => {
    Swal.fire({
      title: "회원가입 성공!",
      text: "코츠코츠랑 열심히 공부해요!",

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
        navigate("/main");
      }
    });
  };

  const JoinFailAlert = (message) => {
    Swal.fire({
      title: "회원가입 실패",
      text: `${message} 다시 시도해주세요.`,

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
        navigate("/join");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        navigate("/");
      }
    });
  };

  const JoinCancel = () => {
    Swal.fire({
      title: "회원가입을 취소하시겠습니까?",
      text: "로그인 페이지로 돌아갑니다",

      imageUrl: "/question.svg",
      imageWidth: 150,
      imageHeight: 150,

      showCancelButton: true,
      confirmButtonColor: "#003CFF",
      cancelButtonColor: "#D9D9D9",
      confirmButtonText: "네",
      cancelButtonText: "아니오",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const phoneNumber = phone1 + phone2 + phone3;

    const userData = {
      email,
      password,
      nickname,
      phoneNumber,
      question,
      answer,
    };

    try {
      const result = await userAPI.join(userData);
      JoinSuccessAlert();
      console.log(result);
    } catch (error) {
      JoinFailAlert(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-auto">
      <div className="flex flex-col items-center justify-start">
        <div className="bg-white dark:bg-zinc-700 rounded-4xl w-full max-w-[1400px] p-10 my-16 shadow-[0_0_6px_rgba(0,0,0,0.1)] flex flex-col">
          <h2 className="text-3xl font-bold flex justify-center mt-14">
            회원가입
          </h2>
          <div className="w-full max-w-[1000px] mx-auto">
            <div className="h-px bg-gray-200 mt-16" />
            <p className="text-sm text-gray-500 text-right mt-4">
              *는 필수 입력 항목
            </p>
          </div>

          <div className="w-full max-w-[800px] mx-auto mt-10">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-[150px_1fr_140px] gap-y-12 gap-x-8 w-full mx-auto mt-10 ml-0 md:ml-14"
            >
              <label className="font-bold text-lg">
                이메일 <span className="text-red-500">*</span>
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="border border-gray-300 px-3 py-2 rounded-xl w-full"
                placeholder="example@email.com"
              />
              <div></div>

              <label className="font-bold text-lg">
                비밀번호 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPassword(value);

                    if (!value && !confirmPassword) {
                      setPasswordMatchMessage("");
                      setIsPasswordMatch(null);
                    } else if (
                      !value ||
                      !confirmPassword ||
                      value !== confirmPassword
                    ) {
                      setPasswordMatchMessage("비밀번호가 일치하지 않습니다.");
                      setIsPasswordMatch(false);
                    } else {
                      setPasswordMatchMessage("비밀번호가 일치합니다.");
                      setIsPasswordMatch(true);
                    }
                  }}
                  className="border border-gray-300 px-3 py-2 rounded-xl w-full"
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div></div>

              <label className="font-bold text-lg">
                비밀번호 확인 <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    const value = e.target.value;
                    setConfirmPassword(value);

                    if (!password && !value) {
                      setPasswordMatchMessage("");
                      setIsPasswordMatch(null);
                    } else if (!password || !value || value !== password) {
                      setPasswordMatchMessage("비밀번호가 일치하지 않습니다.");
                      setIsPasswordMatch(false);
                    } else {
                      setPasswordMatchMessage("비밀번호가 일치합니다.");
                      setIsPasswordMatch(true);
                    }
                  }}
                  className="border border-gray-300 px-3 py-2 rounded-xl w-full"
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
                {passwordMatchMessage && (
                  <div
                    className={`absolute top-1/2 left-full ml-3 -translate-y-1/2 text-sm whitespace-nowrap ${
                      isPasswordMatch ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {passwordMatchMessage}
                  </div>
                )}
              </div>
              <div></div>

              <label className="font-bold text-lg">
                별명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-xl w-full"
              />
              <div></div>

              <label className="font-bold text-lg">
                휴대전화 <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={phone1}
                  onChange={(e) => setPhone1(e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded-xl"
                >
                  <option>010</option>
                  <option>011</option>
                  <option>016</option>
                  <option>017</option>
                  <option>018</option>
                  <option>019</option>
                </select>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={phone2}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setPhone2(value);
                  }}
                  className="border border-gray-300 px-2 py-1 rounded-xl w-24"
                />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={phone3}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setPhone3(value);
                  }}
                  className="border border-gray-300 px-2 py-1 rounded-xl w-24"
                />
              </div>
              <div></div>

              <label className="font-bold text-lg">
                계정 복구 질문 <span className="text-red-500">*</span>
              </label>
              <select
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-xl w-full"
              >
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
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-xl w-full"
              />
              <div></div>

              <div></div>
              <div className="flex gap-4 mt-12">
                <button
                  type="submit"
                  className="bg-[#003CFF] px-8 py-2 rounded-3xl text-lg text-white font-bold hover:bg-[#0536D7] transition-all duration-90 cursor-pointer"
                >
                  회원가입
                </button>
                <button
                  type="button"
                  onClick={JoinCancel}
                  className="bg-white border border-gray-400 text-gray-400 px-12 py-2 rounded-3xl text-lg font-bold cursor-pointer"
                >
                  취소
                </button>
              </div>
              <div></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
