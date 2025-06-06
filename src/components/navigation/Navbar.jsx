import ThemeButton from "../themes/ThemeButton";

export default function Navbar() {
  return (
    <nav
      className="flex justify-between items-center px-6 py-4 bg-white
                dark:bg-zinc-800
                dark:shadow-[0_2px_4px_-1px_rgba(255,255,255,0.3)]
                transition-shadow duration-300
                shadow-md z-10 relative"
    >
      <h1 className="text-lg font-bold text-zinc-800 dark:text-white">
        コツコツ
      </h1>
      <ThemeButton />
    </nav>
  );
}
