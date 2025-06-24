import { useEffect, useState } from "react";
import InquiryBoardList from "../../components/inquiry/InquiryBoardList";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import inquiryAPI from "../../api/inquiryAPI";
import { useSelector } from "react-redux";
import InquiryFormModal from "../../components/inquiry/inquiryFormModal";
import InquiryBoardSkeleton from "../../components/skeleton/Inquiry/InquiryBoardSkeleton";

export default function InquiryPage() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [inquiryList, setInquiryList] = useState([]);
  const [fakeLoading, setFakeLoading] = useState(true);
  const [showInquiryFormModal, setShowInquiryFormModal] = useState(false);

  const PAGE_SIZE = 5;
  const currentUserId = useSelector((state) => state.auth.id);

  const fetchInquiries = async () => {
    try {
      const result = await inquiryAPI.getInquiries({ page, size: PAGE_SIZE });
      setInquiryList(result.content);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("문의글 불러오기 실패", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFakeLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    fetchInquiries();
  }, [page]);

  const handleInquiry = async () => {
    await fetchInquiries();
  };

  const handleAdminReply = (id, replyText) => {
    setInquiryList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, adminReply: replyText, status: "답변 완료" }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setInquiryList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="mt-8 mb-8 px-6 py-4 max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_0_6px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col gap-2 relative mb-8">
        <h1 className="text-3xl font-bold text-center p-4">문의</h1>
        <div className="absolute right-2 top-4 ">
          <button
            onClick={() => setShowInquiryFormModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold border border-blue-600 bg-white text-blue-600 shadow-sm hover:bg-blue-600 hover:text-white transition cursor-pointer"
          >
            <HiOutlinePencilSquare className="w-5 h-5" />
            <span>문의하기</span>
          </button>
        </div>
      </div>

      {fakeLoading ? (
        <InquiryBoardSkeleton />
      ) : (
        <InquiryBoardList
          inquiryList={inquiryList}
          currentUserId={currentUserId}
          onAdminReply={handleAdminReply}
          onDelete={handleDelete}
        />
      )}

      <div className="flex justify-center gap-2 mt-8 mb-6">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className={`w-10 h-10 flex items-center justify-center rounded-full ${
            page === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
          }`}
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
          className={`w-10 h-10 flex items-center justify-center rounded-full ${
            page + 1 >= totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
          }`}
          aria-label="다음"
        >
          <MdChevronRight size={24} />
        </button>
      </div>

      {showInquiryFormModal && (
        <InquiryFormModal
          open={showInquiryFormModal}
          onClose={() => setShowInquiryFormModal(false)}
          onSuccess={handleInquiry}
        />
      )}
    </div>
  );
}
