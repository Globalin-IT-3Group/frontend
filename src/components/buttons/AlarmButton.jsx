import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AlarmButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/alarm")}
      className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg dark:text-white transition cursor-pointer"
    >
      <FaBell size={19} />
    </button>
  );
}
