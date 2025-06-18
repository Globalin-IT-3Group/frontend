import { useState } from "react";
import InquiryBoardList from "../../components/inquiry/InquiryBoardList";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import InquiryFormModal from "../../components/inquiry/inquiryFormModal";

export default function InquiryPage() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [showInquiryFormModal, setShowInquiryFormModal] = useState(false);

  return (
    <div className="mt-8 px-6 py-4 max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)]">
      {/* 상단 제목 */}
      <div className="flex flex-col gap-2 relative">
        {/* 가운데 정렬된 제목 */}
        <h1 className="text-3xl font-bold text-center p-4">문의</h1>

        {/* 오른쪽 상단 버튼 */}
        <div className="absolute right-2 top-4">
          <button
            onClick={() => setShowInquiryFormModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold border border-blue-600 bg-white text-blue-600 shadow-sm hover:bg-blue-600 hover:text-white hover:shadow transition cursor-pointer"
          >
            <HiOutlinePencilSquare className="w-5 h-5" />
            <span>문의하기</span>
          </button>
        </div>
      </div>

      {/* 본문 리스트 */}
      <InquiryBoardList />
      <div className="flex justify-center gap-2 mt-8 mb-6">
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

      {showInquiryFormModal && (
        <InquiryFormModal
          open={showInquiryFormModal}
          onClose={() => setShowInquiryFormModal(false)}
        />
      )}
    </div>
  );
}
