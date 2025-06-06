import { Link } from "react-router-dom";

function BasicSidebar() {
  return (
    <div className="h-full p-4 dark:text-white">
      {/* space-y-3 -> li 간격 조정 */}
      <ul className="space-y-3">
        <li className="text-xl">내 문서</li>
        <li className="text-xl">뭐뭐</li>
        <li className="text-xl">몰라몰라</li>
        <li>
          <Link to="/chat" className="block text-xl flex">
            <p className="hover:text-blue-500 transition-colors">💬 채팅</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default BasicSidebar;
