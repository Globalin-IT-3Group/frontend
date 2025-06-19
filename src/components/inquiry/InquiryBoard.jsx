import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { CiLock } from "react-icons/ci";

export default function InquiryBoard({
  id,
  title,
  date,
  content,
  author,
  status,
  isPrivate,
  adminReply,
  onAdminReply,
  onDelete,
  currentUser,
}) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [expanded, setExpanded] = useState(false);

  const isOwner = author === currentUser;
  const isHidden = isPrivate && !isOwner;

  return (
    <div>
      <Accordion
        elevation={0}
        expanded={expanded}
        onChange={() => setExpanded((prev) => !prev)}
        className="rounded-2xl mb-2"
      >
        <AccordionSummary className="px-4 py-4 hover:bg-blue-50 transition cursor-pointer bg-white rounded-xl mb-5">
          <div className="flex flex-col w-full gap-3">
            {/* 첫 줄: 제목 + 날짜 + 상태 + ▼ */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold flex items-center gap-1">
                  {isPrivate && (
                    <span className="text-gray-400">
                      <CiLock size={20} />
                    </span>
                  )}
                  {title}
                </span>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {date}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-blue-600 font-medium">
                  {status}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded((prev) => !prev);
                  }}
                  className="text-gray-500 hover:text-gray-800 transition cursor-pointer"
                  aria-label="토글"
                >
                  <MdExpandMore
                    className={`transition-transform duration-300 ${
                      expanded ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </button>
              </div>
            </div>

            {/* 두 번째 줄: 작성자 + count/comment */}
            <div className="flex items-center justify-between w-full mb-2">
              <div className="flex items-center gap-2">
                <img
                  src="https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg"
                  alt="profile"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-sm text-gray-500 hover:underline cursor-pointer">
                  {author}
                </span>
              </div>
            </div>
          </div>
        </AccordionSummary>

        <AccordionDetails className="bg-gray-100">
          {isHidden ? (
            <div className="text-gray-400 p-4 italic">비밀글입니다.</div>
          ) : (
            <>
              <div className="text-md text-gray-600 font-normal mb-3 p-3 whitespace-pre-wrap">
                {content}
              </div>

              {adminReply ? (
                <div className="border-t border-gray-300 pt-4 mt-4 p-3">
                  <div className="text-sm text-blue-600 font-bold mb-2 mt-2">
                    코츠코츠
                  </div>
                  <div className="text-sm text-gray-700 whitespace-pre-wrap">
                    {adminReply}
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center px-3 mt-3">
                    <button
                      onClick={() => setReplyOpen((prev) => !prev)}
                      className="text-sm text-indigo-600 underline cursor-pointer"
                    >
                      {replyOpen ? "답변 취소" : "답변하기"}
                    </button>

                    {isOwner && (
                      <button
                        onClick={() => {
                          if (window.confirm("정말 삭제하시겠습니까?")) {
                            onDelete(id);
                          }
                        }}
                        className="text-sm hover:underline cursor-pointer"
                      >
                        삭제하기
                      </button>
                    )}
                  </div>

                  {replyOpen && (
                    <div className="mt-3 p-3">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="답변 내용을 입력하세요"
                        className="border rounded px-3 py-2 text-sm resize-none w-full"
                      />
                      <button
                        onClick={() => {
                          if (replyText.trim()) {
                            onAdminReply(id, replyText);
                            setReplyText("");
                            setReplyOpen(false);
                          }
                        }}
                        className="mt-2 bg-indigo-600 text-white px-4 py-1 rounded text-sm hover:bg-indigo-700"
                      >
                        등록
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
