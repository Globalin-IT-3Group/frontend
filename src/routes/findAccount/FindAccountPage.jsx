import { useLocation, Link } from "react-router-dom";
import FindEmailForm from "../../components/findAccount/FindEmailForm";
import FindPasswordForm from "../../components/findAccount/FindPasswordForm";

export default function FindAccountPage() {
  const location = useLocation();
  const isEmail = location.pathname === "/find/email";

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-4xl w-[1400px] h-auto p-10 m-16 shadow-[0_0_6px_rgba(0,0,0,0.1)] overflow-y-auto flex flex-col">
        <div className="flex justify-center mt-4 mx-auto p-4 gap-8">
          <Link to="/find/email">
            <h1
              className={`text-3xl font-bold ml-4 mb-8 ${
                isEmail ? "text-black" : "text-gray-400"
              }`}
            >
              이메일 찾기
            </h1>
          </Link>
          <Link to="/find/password">
            <h1
              className={`text-3xl font-bold ml-4 mb-8 ${
                !isEmail ? "text-black" : "text-gray-400"
              }`}
            >
              비밀번호 찾기
            </h1>
          </Link>
        </div>

        {/* 폼 */}
        {isEmail ? <FindEmailForm /> : <FindPasswordForm />}
      </div>
    </div>
  );
}
