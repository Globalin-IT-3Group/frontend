import ThemeButton from "../buttons/ThemeButton";
import LoginButton from "../buttons/LoginButton";

export default function Navbar() {
  return (
    <div>
      <nav
        className="flex justify-between items-center px-6 py-4 bg-white
                dark:bg-zinc-800
                dark:shadow-[0_2px_4px_-1px_rgba(255,255,255,0.3)]
                shadow-md z-10 relative
                transition-all duration-300"
      >
        <h1
          style={{ fontFamily: '"Nico Moji", sans-serif' }}
          className="text-3xl font-bold text-zinc-800 dark:text-white"
        >
          コツコツ
        </h1>

        <div className="flex gap-4">
          <ThemeButton />
          <LoginButton />
        </div>
      </nav>
    </div>
  );
}
