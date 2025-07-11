import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import inquiryAPI from "../../api/inquiryAPI";

export default function InquiryBoard({
  id,
  title,
  date,
  content,
  isPrivate,
  adminReply,
  status,
  author,
  authorId,
  authorProfileImage,
  currentUserId,
  onAdminReply,
}) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [expanded, setExpanded] = useState(false);

  const isOwner = authorId === currentUserId;
  const isAdmin = currentUserId === 1;
  const isHidden = isPrivate && !isOwner;

  const profileImage =
    authorProfileImage ||
    "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg";

  return (
    <div className="w-full">
      <Accordion
        elevation={0}
        disableGutters
        expanded={expanded}
        onChange={() => setExpanded((prev) => !prev)}
        className="rounded-2xl mb-2 border border-white dark:border-zinc-500"
        sx={{
          backgroundColor: "transparent",
          "&.Mui-expanded": {
            margin: 0,
          },
        }}
      >
        <AccordionSummary
          expandIcon={
            <MdExpandMore
              className={`transition-transform duration-300 ${
                expanded ? "rotate-180" : ""
              } text-gray-500 dark:text-gray-200`}
              size={20}
            />
          }
          sx={{ backgroundColor: "transparent" }}
        >
          <div className="w-full px-4 py-4 bg-white dark:bg-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-500 transition cursor-pointer rounded-2xl">
            <div className="flex flex-col w-full gap-3">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold flex items-center gap-1 text-gray-900 dark:text-white">
                    {isPrivate && (
                      <span className="text-gray-500 dark:text-gray-200">
                        <CiLock size={20} />
                      </span>
                    )}
                    {title}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-200 whitespace-nowrap">
                    {new Date(date).toLocaleDateString("ko-KR")}
                  </span>
                </div>
                <span
                  className={`text-sm font-medium ${
                    status === "미확인"
                      ? "text-gray-400 dark:text-gray-200"
                      : "text-blue-600 dark:text-blue-300"
                  }`}
                >
                  {status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={profileImage}
                  alt="profile"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-sm text-gray-500 dark:text-gray-300">
                  {author}
                </span>
              </div>
            </div>
          </div>
        </AccordionSummary>

        <AccordionDetails sx={{ backgroundColor: "transparent" }}>
          <div className="w-full px-4 py-4 bg-gray-100 dark:bg-zinc-700 rounded-b-2xl">
            {isHidden ? (
              <div className="text-gray-400 dark:text-gray-300 p-4 italic">
                비밀글입니다.
              </div>
            ) : (
              <>
                <div className="text-md text-gray-600 dark:text-gray-200 mb-3 p-3 whitespace-pre-wrap">
                  {content}
                </div>

                {adminReply && (
                  <div className="border-t border-gray-300 dark:border-zinc-500 pt-4 mt-4 p-3">
                    <div className="text-md text-blue-600 dark:text-blue-300 font-bold mb-2">
                      코츠코츠
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
                      {adminReply}
                    </div>
                  </div>
                )}

                {!adminReply && isAdmin && (
                  <>
                    <div className="flex justify-end items-center px-3 mt-4">
                      <button
                        onClick={() => setReplyOpen((prev) => !prev)}
                        className="text-sm text-blue-600 hover:underline dark:text-blue-300"
                      >
                        {replyOpen ? "답변 취소" : "답변하기"}
                      </button>
                    </div>

                    {replyOpen && (
                      <div className="flex flex-col mt-3 p-3 gap-3">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="답변 내용을 입력하세요"
                          className="border border-gray-400 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-xl px-3 py-2 text-sm resize-none w-full"
                        />
                        <div className="flex justify-end">
                          <button
                            onClick={async () => {
                              if (replyText.trim()) {
                                try {
                                  await inquiryAPI.replyToInquiry({
                                    inquiryId: id,
                                    replyText,
                                  });
                                  onAdminReply(id, replyText);
                                  setReplyText("");
                                  setReplyOpen(false);
                                } catch (err) {
                                  console.error("답변 등록 실패:", err);
                                  alert("답변 등록 중 오류가 발생했습니다.");
                                }
                              }
                            }}
                            className="w-[60px] bg-[#003CFF] text-white px-4 py-1 rounded-xl text-sm hover:bg-blue-700 cursor-pointer transition-all duration-200"
                          >
                            등록
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
