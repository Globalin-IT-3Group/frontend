import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useState } from "react";
import { MdExpandMore } from "react-icons/md";

export default function InquiryBoard({
  title,
  date,
  content,
  author,
  status,
  adminReply,
}) {
  const [expanded, setExpanded] = useState(false);
  const handleToggle = (e) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };

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
                <span className="text-xl font-bold">{title}</span>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {date}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-blue-600 font-medium">
                  {status}
                </span>
                <button
                  onClick={handleToggle}
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
          <div className="text-md text-gray-600 font-normal mb-3 p-3">
            {content}
          </div>

          {adminReply && (
            <div className="border-t border-gray-300 pt-4 mt-4 p-3">
              <div className="text-sm text-blue-600 font-bold mb-2 mt-2">
                코츠코츠
              </div>
              <div className="text-sm text-gray-700 whitespace-pre-wrap">
                {adminReply}
              </div>
            </div>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
