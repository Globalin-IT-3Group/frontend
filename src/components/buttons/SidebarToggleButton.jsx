import { IoMenu } from "react-icons/io5";

export default function SidebarToggleButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg dark:text-white transition cursor-pointer lg:hidden"
      aria-label="사이드바 열기"
    >
      <IoMenu size={24} />
    </button>
  );
}
