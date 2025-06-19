import InquiryBoard from "./InquiryBoard";

export default function InquiryBoardList({
  inquiryList,
  onAdminReply,
  onDelete,
}) {
  if (!inquiryList || inquiryList.length === 0) {
    return (
      <div className="text-gray-400 text-center py-20">문의글이 없습니다.</div>
    );
  }

  return (
    <ul className="w-full divide-y divide-gray-300 space-y-3">
      {inquiryList.map((item) => (
        <InquiryBoard
          key={item.id}
          id={item.id}
          title={item.title}
          date={item.date}
          content={item.content}
          author={item.author}
          status={item.status}
          adminReply={item.adminReply}
          isPrivate={item.isPrivate}
          onAdminReply={onAdminReply}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
