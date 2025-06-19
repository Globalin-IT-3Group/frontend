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

  console.log("authirId: ", authorId);
  console.log("currentId: ", currentUserId);
  console.log("isPrivate: ", isPrivate);

  const profileImage =
    authorProfileImage ||
    "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg";

  return (
    <div>
      <Accordion
        elevation={0}
        expanded={expanded}
        onChange={() => setExpanded((prev) => !prev)}
        className="rounded-2xl mb-2"
      >
        <AccordionSummary>
          <div className="w-full px-4 py-4 hover:bg-blue-50 cursor-pointer transition bg-white">
            <div className="flex flex-col w-full gap-3">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold flex items-center gap-1">
                    {isPrivate && (
                      <span className="text-gray-500">
                        <CiLock size={20} />
                      </span>
                    )}
                    {title}
                  </span>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {new Date(date).toLocaleDateString("ko-KR")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-medium ${
                      status === "미확인" ? "text-gray-400" : "text-blue-600"
                    }`}
                  >
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

              <div className="flex items-center gap-2">
                <img
                  src={profileImage}
                  alt="profile"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-sm text-gray-500">{author}</span>
              </div>
            </div>
          </div>
        </AccordionSummary>

        <AccordionDetails>
          <div className="w-full px-4 py-4 bg-gray-100">
            {isHidden ? (
              <div className="text-gray-400 p-4 italic">비밀글입니다.</div>
            ) : (
              <>
                <div className="text-md text-gray-600 mb-3 p-3 whitespace-pre-wrap">
                  {content}
                </div>

                {adminReply && (
                  <div className="border-t border-gray-300 pt-4 mt-4 p-3">
                    <div className="text-md text-blue-600 font-bold mb-2">
                      코츠코츠
                    </div>
                    <div className="text-sm text-gray-700 whitespace-pre-wrap">
                      {adminReply}
                    </div>
                  </div>
                )}

                {!adminReply && isAdmin && (
                  <>
                    <div className="flex justify-end items-center px-3 mt-4">
                      <button
                        onClick={() => setReplyOpen((prev) => !prev)}
                        className="text-sm cursor-pointer"
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
                          className="border border-gray-400 rounded-xl px-3 py-2 text-sm resize-none w-full"
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
                            className="w-[60px] bg-[#0033CF] text-white px-4 py-1 rounded-xl text-sm hover:bg-blue-700 cursor-pointer transition-all duration-200"
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
