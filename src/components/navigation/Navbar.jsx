import ThemeButton from "../buttons/ThemeButton";
import LoginButton from "../buttons/LoginButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const user = useSelector((state) => state.auth);

  return (
    <nav
      className="flex justify-between items-center px-6 py-4 bg-white
                dark:bg-zinc-800
                dark:shadow-[0_2px_4px_-1px_rgba(255,255,255,0.3)]
                shadow-md z-10 relative
                transition-all duration-300"
    >
      <Link
        to="/"
        style={{ fontFamily: '"Nico Moji", sans-serif' }}
        className="text-4xl text-[#003CFF] font-bold dark:text-white"
      >
        コツコツ
      </Link>

      <div className="flex gap-4">
        <ThemeButton />
        {user.isLoggedIn ? (
          <div className="flex items-center justify-center h-full">
            <div
              className="
      w-10 h-10 rounded-full p-1
      bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500
      flex items-center justify-center
    "
            >
              <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
                <img
                  src={
                    user.profileImage ||
                    "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg"
                  }
                  alt="profile"
                  className="w-7 h-7 object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </nav>
  );
}
