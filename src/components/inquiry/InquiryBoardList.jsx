import InquiryBoard from "./InquiryBoard";

export default function InquiryBoardList() {
  const inquiryList = [
    {
      id: 1,
      title: "스터디 관련 문의",
      date: "25. 06. 18.",
      content: "회화 관련 스터디 개설 어떻게 하나요?",
      author: "핑구",
      status: "미확인",
      adminReply: null,
    },
    {
      id: 2,
      title: "채팅 문의드립니다",
      date: "25. 06. 15.",
      content: "먀우",
      author: "핑구",
      status: "답변 완료",
      adminReply: "먀우 확인했습니다. 감사합니다.",
    },
  ];
  if (!inquiryList || inquiryList.length === 0) {
    return (
      <div className="text-gray-400 text-center py-20">문의글이 없습니다.</div>
    );
  }

  return (
    <ul className="w-full">
      {inquiryList.map((item) => (
        <InquiryBoard key={item.id} {...item} />
      ))}
    </ul>
  );
}
