import InquiryBoard from "./InquiryBoard";

export default function InquiryBoardList({
  inquiryList,
  onAdminReply,
  onDelete,
  currentUserId,
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
          content={item.content}
          date={item.createdAt}
          isPrivate={item.isPrivate}
          adminReply={item.adminReply}
          status={item.adminReply ? "답변 완료" : "미확인"}
          author={item.user.nickname}
          authorId={item.user.id}
          authorProfileImage={item.user.profileImage}
          currentUserId={currentUserId}
          onAdminReply={onAdminReply}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
