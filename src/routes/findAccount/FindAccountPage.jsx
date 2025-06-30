import { useLocation, Link } from "react-router-dom";
import FindEmailForm from "../../components/findAccount/FindEmailForm";
import FindPasswordForm from "../../components/findAccount/FindPasswordForm";
import { useState } from "react";
import LoginModal from "../../components/Login/LoginModal";

export default function FindAccountPage() {
  const location = useLocation();
  const isEmail = location.pathname === "/find/email";
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-800 transition-all duration-300">
      <div className="bg-white dark:bg-zinc-700 rounded-4xl w-[1400px] h-auto p-10 m-16 shadow-[0_0_6px_rgba(0,0,0,0.1)] overflow-y-auto flex flex-col text-black dark:text-white">
        <div className="flex justify-center mt-4 mx-auto p-4 gap-8">
          <Link to="/find/email">
            <h1
              className={`text-3xl font-bold ml-4 mb-8 transition-colors duration-200 ${
                isEmail
                  ? "text-black dark:text-white"
                  : "text-gray-400 dark:text-gray-400"
              }`}
            >
              이메일 찾기
            </h1>
          </Link>

          <Link to="/find/password">
            <h1
              className={`text-3xl font-bold ml-4 mb-8 transition-colors duration-200 ${
                !isEmail
                  ? "text-black dark:text-white"
                  : "text-gray-400 dark:text-gray-400"
              }`}
            >
              비밀번호 찾기
            </h1>
          </Link>
        </div>

        {isEmail ? (
          <FindEmailForm onLoginClick={() => setShowLoginModal(true)} />
        ) : (
          <FindPasswordForm onLoginClick={() => setShowLoginModal(true)} />
        )}

        {showLoginModal && (
          <LoginModal onClose={() => setShowLoginModal(false)} />
        )}
      </div>
    </div>
  );
}
