import ThemeButton from "../buttons/ThemeButton";
import LoginButton from "../buttons/LoginButton";
import AlarmButton from "../buttons/AlarmButton";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileAvatar from "./ProfileAvatar";
import ProfileDropdown from "./ProfileDropdown";
import { logout } from "../../store/reducers/authSlice";

export default function Navbar() {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // 로그아웃 함수
  const handleLogout = () => {
    dispatch(logout(user));
    navigate("/main");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-zinc-800 dark:shadow-[0_2px_4px_-1px_rgba(255,255,255,0.3)] shadow-md z-10 relative transition-all duration-300">
      <button
        onClick={() => {
          if (location.pathname === "/main") {
            navigate(0);
          } else {
            navigate("/main");
          }
        }}
        style={{ fontFamily: '"Nico Moji", sans-serif' }}
        className="text-4xl text-[#003CFF] font-bold dark:text-white cursor-pointer"
      >
        コツコツ
      </button>
      <div className="flex gap-4">
        <AlarmButton />
        <ThemeButton />
        {user.isLoggedIn ? (
          <ProfileDropdown
            avatar={
              <ProfileAvatar
                src={
                  user.profileImage ||
                  "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg"
                }
                className="cursor-pointer"
              />
            }
          >
            {(closeMenu) => (
              <>
                <div className=" flex flex-col items-center px-4 pt-2 pb-3 border-b border-gray-200 dark:border-zinc-800">
                  <img
                    src={
                      user.profileImage ||
                      "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg"
                    }
                    alt="profile"
                    className="w-16 h-16 object-cover rounded-full mb-2"
                  />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {user.nickname || "닉네임"}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email || "이메일"}
                  </span>
                </div>
                {/* 하단 버튼 영역 - 수평 정렬 */}
                <div className="flex justify-around px-2 pt-2">
                  <Link
                    to="/main/my-info"
                    className="px-4 py-2 rounded-md text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700 font-medium transition"
                    onClick={closeMenu}
                  >
                    내 정보
                  </Link>
                  {/* <div className="border-r border-gray-200 dark:border-zinc-800" /> */}
                  <button
                    onClick={() => {
                      closeMenu();
                      handleLogout();
                    }}
                    className="px-4 py-2 rounded-md text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700 font-medium transition cursor-pointer"
                  >
                    로그아웃
                  </button>
                </div>
              </>
            )}
          </ProfileDropdown>
        ) : (
          <LoginButton />
        )}
      </div>
    </nav>
  );
}
