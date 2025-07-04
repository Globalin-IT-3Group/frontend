import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import userAPI from "../../api/userAPI";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/reducers/authSlice";

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const restApiKey = import.meta.env.VITE_REST_API_KEY;
  const redirect_uri = import.meta.env.VITE_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${restApiKey}&redirect_uri=${redirect_uri}`;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LoginSuccess = () => {
    Swal.fire({
      title: "로그인 성공!",
      text: "오늘도 열심히 공부해요!",
      imageUrl: "/success.svg",
      imageWidth: 120,
      imageHeight: 120,
      confirmButtonColor: "#003CFF",
      confirmButtonText: "메인 페이지",
    }).then(() => {
      navigate("/main");
    });
  };

  const LoginFail = (message) => {
    Swal.fire({
      title: "로그인 실패!",
      text: message,
      imageUrl: "/error.svg",
      imageWidth: 120,
      imageHeight: 120,
      showCancelButton: false,
      confirmButtonColor: "#003CFF",
      confirmButtonText: "닫기",
    });
  };

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleLogin = async () => {
    const loginData = { email, password };
    try {
      const user = await userAPI.login(loginData);
      console.log("일반 로그인 성공!", user);
      dispatch(setUser(user));
      LoginSuccess();
    } catch (error) {
      LoginFail(error.response?.data?.message || "로그인에 실패했습니다.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-4xl w-[350px] h-[480px] sm:w-[500px] sm:h-[600px] p-6 shadow-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#676767] text-2xl text-gray-400 rounded-4xl px-2 hover:text-gray-500 transition-all duration-100 cursor-pointer"
        >
          ×
        </button>

        <h2
          style={{ fontFamily: '"Nico Moji", sans-serif' }}
          className="text-xs sm:text-md font-md ml-5 mt-6 mb-2 dark:text-black"
        >
          コツコツ
        </h2>
        <h1 className="text-lg sm:text-3xl sm:mb-8 font-bold ml-4 dark:text-black">
          로그인
        </h1>

        {/* ✅ 로그인 폼 시작 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="w-[280px] h-[260px] sm:w-[400px] sm:h-[320px] mx-auto bg-white rounded-3xl shadow-[0_0_6px_rgba(0,0,0,0.1)] p-5 sm:p-8 m-3">
            <div className="flex flex-col space-y-4 justify-center">
              <div>
                <label className="block text-xs sm:text-sm text-[#676767] font-bold mb-2">
                  이메일 아이디
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일을 입력해 주세요"
                  className="w-full px-4 py-2 border border-[#CBCBCB] placeholder-[#CBCBCB] rounded-xl text-[10px] sm:text-sm dark:text-black"
                  required
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm text-[#676767] font-bold mb-2">
                  비밀번호
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력해 주세요"
                  className="w-full px-4 py-2 border border-[#CBCBCB] placeholder-[#CBCBCB] rounded-xl text-[10px] sm:text-sm dark:text-black"
                  required
                />
              </div>
              <div className="flex flex-col mx-auto justify-center mt-1">
                <button
                  type="submit"
                  className="text-xs sm:text-sm w-[150px] sm:w-[190px] py-3 bg-[#003CFF] text-white font-bold rounded-3xl hover:bg-blue-500 active:scale-95 transition-all duration-90 cursor-pointer"
                >
                  로그인
                </button>
                <div className="text-center text-sm text-[#676767] mr-1 mt-2">
                  <button
                    onClick={() => {
                      onClose();
                      navigate("/find/email");
                    }}
                    className="hover:text-black transition cursor-pointer text-[10px] sm:text-xs"
                  >
                    이메일 비밀번호 찾기
                  </button>
                  <span className="mx-2 text-[10px] sm:text-xs">|</span>
                  <button
                    onClick={() => {
                      onClose();
                      navigate("/join");
                    }}
                    className="hover:text-black transition cursor-pointer text-[10px] sm:text-xs"
                  >
                    회원가입
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* ✅ 로그인 폼 끝 */}

        <button
          onClick={handleKakaoLogin}
          className="flex mx-auto items-center justify-center w-[280px] sm:w-[400px] shadow-[0_0_6px_rgba(0,0,0,0.1)] p-2 sm:px-2 sm:py-3 rounded-xl sm:rounded-2xl hover:bg-gray-100 transition cursor-pointer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg"
            alt="Kakao"
            className="w-7 h-7 mr-2 rounded-xl"
          />
          <span className="text-[#676767] text-[10px] sm:text-sm">
            카카오로 회원가입 / 로그인
          </span>
        </button>
      </div>
    </div>
  );
}
