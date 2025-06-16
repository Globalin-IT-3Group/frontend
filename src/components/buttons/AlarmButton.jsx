import { FaBell } from "react-icons/fa";

export default function ThemeButton() {
  return (
    <button
      onClick={""}
      className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg dark:text-white transition cursor-pointer"
    >
      <FaBell size={19} />
    </button>
  );
}
