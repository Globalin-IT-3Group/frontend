import { useEffect, useState } from "react";
import BoardApi from "../../api/boardAPI";
import { useNavigate } from "react-router-dom";
import { LuClock } from "react-icons/lu";
import { HiTrendingUp } from "react-icons/hi";
import { BsPostcard } from "react-icons/bs";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import BoardList from "../../components/community/BoardList";

const TAB_LIST = [
  {
    label: "New",
    sort: "createdAt,desc",
    icon: <LuClock className="w-5 h-5" />,
  },
  {
    label: "Most View",
    sort: "viewCount,desc",
    icon: <HiTrendingUp className="w-5 h-5" />,
  },
  {
    label: "My Post",
    sort: "my,desc",
    icon: <BsPostcard className="w-5 h-5" />,
  },
];

export default function CommunityPage() {
  const [boards, setBoards] = useState([]);
  const [activeTab, setActiveTab] = useState(TAB_LIST[0]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    let fetchPromise;
    if (activeTab.label === "My Post") {
      fetchPromise = BoardApi.getMyBoards({ page, size });
    } else {
      const sortParam = activeTab.sort;
      fetchPromise = BoardApi.getBoards({ page, size, sort: sortParam });
    }

    fetchPromise.then((data) => {
      // Page<Board> 구조라면 content와 totalPages 등 분리
      if (Array.isArray(data)) {
        setBoards(data);
        setTotalPages(1);
      } else if (data && Array.isArray(data.content)) {
        setBoards(data.content);
        setTotalPages(data.totalPages || 1);
      } else {
        setBoards([]);
        setTotalPages(1);
      }
    });
  }, [activeTab, page, size]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        {/* 상단 탭 필터 */}
        <div className="flex items-center mb-8">
          <div className="flex space-x-8 ml-4">
            {TAB_LIST.map((tab) => {
              const isActive = activeTab.label === tab.label;
              return (
                <div
                  key={tab.label}
                  onClick={() => {
                    setActiveTab(tab);
                    setPage(0);
                  }}
                  className={`relative group flex items-center gap-x-2 cursor-pointer transition-all duration-300 transform ${
                    isActive
                      ? "text-black -translate-y-1"
                      : "text-gray-500 hover:text-black hover:-translate-y-1"
                  }`}
                >
                  {tab.icon}
                  <span
                    className={`text-md relative whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#003CFF] after:transition-all after:duration-300 ${
                      isActive
                        ? "after:left-0 after:w-full"
                        : "group-hover:after:left-0 group-hover:after:w-full after:w-0"
                    }`}
                  >
                    {tab.label}
                  </span>
                </div>
              );
            })}
          </div>
          {/* 글쓰기 버튼 */}
          <div className="ml-auto">
            <button
              className="
                ml-auto flex items-center gap-2
                px-4 py-2 rounded-lg font-semibold
                border border-blue-600 bg-white text-blue-600
                shadow-sm hover:bg-blue-600 hover:text-white hover:shadow
                transition
                "
              onClick={() => navigate("/community/write")}
            >
              <HiOutlinePencilSquare className="w-5 h-5" />
              글쓰기
            </button>
          </div>
        </div>

        {/* 리스트 - BoardList 컴포넌트 사용 */}
        <BoardList
          boards={boards}
          onItemClick={(board) => navigate(`/community/${board.id}`)}
        />

        {/* 페이지네이션 */}
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className={`
              flex items-center justify-center w-10 h-10 rounded-full
              ${
                page === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
              }
            `}
            aria-label="이전"
          >
            <MdChevronLeft size={24} />
          </button>
          <span className="flex items-center px-4 font-semibold">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page + 1 >= totalPages}
            className={`
              flex items-center justify-center w-10 h-10 rounded-full
              ${
                page + 1 >= totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
              }
            `}
            aria-label="다음"
          >
            <MdChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
