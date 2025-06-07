export default function LoginModal({ onClose }) {
  const restApiKey = import.meta.env.VITE_REST_API_KEY;
  const redirect_uri = import.meta.env.VITE_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${restApiKey}&redirect_uri=${redirect_uri}`;
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-4xl w-[650px] h-[770px] p-10 shadow-md relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#676767] text-xl border border-gray-400 text-gray-400 rounded-4xl px-2 hover:border-gray-500 hover:text-gray-500 transition-all duration-100"
        >
          ×
        </button>

        <h2 className="text-md font-md ml-4 mt-16 mb-2">コツコツ</h2>
        <h1 className="text-4xl font-bold ml-4 mb-8">로그인</h1>

        <div className="bg-white rounded-3xl shadow-[0_0_6px_rgba(0,0,0,0.1)] p-10 m-4 space-y-6">
          <div>
            <label className="block text-md text-[#676767] font-bold mb-2">
              이메일 아이디
            </label>
            <input
              type="email"
              placeholder="이메일을 입력해 주세요"
              className="w-full px-4 py-2 border border-[#CBCBCB] placeholder-[#CBCBCB] rounded-xl"
            />
          </div>
          <div>
            <label className="block text-md text-[#676767] font-bold mb-2">
              비밀번호
            </label>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              className="w-full px-4 py-2 border border-[#CBCBCB] placeholder-[#CBCBCB] rounded-xl"
            />
          </div>
          <div className="flex justify-center">
            <button className="w-[250px] py-3 bg-[#5500ff] text-white font-bold rounded-2xl hover:bg-[#4600D1] active:scale-95 transition-all duration-100">
              로그인
            </button>
          </div>

          <div className="text-center text-sm text-[#676767]">
            <a href="#">아이디 비밀번호 찾기</a>
            <span className="mx-2">|</span>
            <a href="#">회원가입</a>
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="bg-white w-[540px] rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] m-4 mt-6 p-4 text-center flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg"
            alt="Kakao"
            className="w-7 h-7 mr-2 rounded-xl"
          />
          <span className="text-[#676767] text-sm">
            카카오로 회원가입 / 로그인
          </span>
        </button>
      </div>
    </div>
  );
}
