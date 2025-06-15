import { Link } from "react-router-dom";

function BasicSidebar() {
  return (
    <div className="h-full p-4 dark:text-white">
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 p-4">
        <li className="flex flex-col items-center gap-3">
          <Link
            to="/study/mystudyroom"
            className="flex flex-col items-center gap-3"
          >
            <label className="inline-flex items-center justify-center bg-white rounded-full p-2 text-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] hover:text-white hover:bg-gradient-to-bl from-blue-200 to-blue-400 transition-all duration-300">
              🏷️
            </label>
            <p className="text-sm font-bold">내 스터디방</p>
          </Link>
        </li>
        <li className="flex flex-col items-center gap-3">
          <Link
            to="/study/recruit"
            className="flex flex-col items-center gap-3"
          >
            <label className="inline-flex items-center justify-center bg-white rounded-full p-2 text-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] hover:text-white hover:bg-gradient-to-bl from-blue-200 to-blue-400 transition-all duration-300">
              🙋
            </label>
            <p className="text-sm font-bold">스터디 구인</p>
          </Link>
        </li>
        <li className="flex flex-col items-center gap-3">
          <Link to="/chat" className="flex flex-col items-center gap-3">
            <label className="inline-flex items-center justify-center bg-white rounded-full p-2 text-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] hover:text-white hover:bg-gradient-to-bl from-blue-200 to-blue-400 transition-all duration-300">
              💬
            </label>
            <p className="text-sm font-bold">채팅</p>
          </Link>
        </li>
        <li className="flex flex-col items-center gap-3">
          <Link to="/word" className="flex flex-col items-center gap-3">
            <label className="inline-flex items-center justify-center bg-white rounded-full p-2 text-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)] hover:text-white hover:bg-gradient-to-bl from-blue-200 to-blue-400 transition-all duration-300">
              📘
            </label>
            <p className="text-sm font-bold">단어장</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default BasicSidebar;
