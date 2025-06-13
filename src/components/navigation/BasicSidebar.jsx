import { Link } from "react-router-dom";

function BasicSidebar() {
  return (
    <div className="h-full p-4 dark:text-white">
      <ul className="p-4 space-y-5">
        <li className="text-xl">내 문서</li>
        <li>
          <Link
            to="/my-info"
            className="block text-xl flex hover:text-blue-500 transition-colors"
          >
            내 정보
          </Link>
        </li>
        <li>
          <Link
            to="/study/recruit"
            className="block text-xl flex hover:text-blue-500 transition-colors"
          >
            스터디 구인
          </Link>
        </li>
        <li>
          <Link to="/chat" className="block text-xl flex">
            <p className="hover:text-blue-500 transition-colors">💬 채팅</p>
          </Link>
        </li>
        <li>
          <Link to="/word" className="block text-xl flex">
            <p className="hover:text-blue-500 transition-colors">📕 단어장</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default BasicSidebar;
