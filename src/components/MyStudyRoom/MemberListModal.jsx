import { useEffect, useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import friendAPI from "../../api/friendAPI";
import StudyRoomApi from "../../api/studyRoomAPI";
import { AiOutlineClose } from "react-icons/ai";
import { PiUserPlusFill } from "react-icons/pi";
import Swal from "sweetalert2";

export default function MemberListModal({
  open,
  onClose,
  members = [],
  myUserId,
  studyRoomId,
  onRefresh,
}) {
  const [friendRelation, setFriendRelation] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    // 모달 열릴 때 멤버별 친구 상태 조회
    if (open && members.length > 0) {
      members.forEach((m) => {
        if (m.userId !== myUserId) {
          friendAPI.getFriendRelation(m.userId).then((rel) => {
            setFriendRelation((prev) => ({ ...prev, [m.userId]: rel }));
          });
        }
      });
    }
    if (!open) setFriendRelation({});
  }, [open, members, myUserId]);

  const handleFriend = async (targetUserId) => {
    setLoadingId(targetUserId);

    await friendAPI.requestOrCancelFriend(targetUserId);
    const rel = await friendAPI.getFriendRelation(targetUserId);
    setFriendRelation((prev) => ({ ...prev, [targetUserId]: rel }));
    setLoadingId(null);
  };

  // 친구 요청 수락
  const handleAccept = async (targetUserId) => {
    setLoadingId(targetUserId);
    await friendAPI.acceptFriendRequest(targetUserId);
    const rel = await friendAPI.getFriendRelation(targetUserId);
    setFriendRelation((prev) => ({ ...prev, [targetUserId]: rel }));
    setLoadingId(null);
  };

  const handleLeave = async () => {
    const result = await Swal.fire({
      title: "정말로 이 스터디를 탈퇴하시겠습니까?",
      text: "탈퇴하면 다시 가입해야 합니다.",

      imageUrl: "/question.svg",
      imageWidth: 150,
      imageHeight: 150,

      showCancelButton: true,
      confirmButtonColor: "#003CFF",
      confirmButtonText: "탈퇴",
      cancelButtonText: "취소",
    });

    if (!result.isConfirmed) return;

    await Swal.fire({
      title: "지이이인짜로 탈퇴하실 겁니까?",
      text: "마지막 기회입니다.",

      imageUrl: "/question.svg",
      imageWidth: 150,
      imageHeight: 150,

      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "탈퇴",
      cancelButtonText: "취소",
    });

    if (!result.isConfirmed) return;

    try {
      await StudyRoomApi.leaveStudyRoom(studyRoomId);
      await Swal.fire({
        title: "탈퇴 완료!",
        text: "스터디를 성공적으로 탈퇴했습니다.",
        imageUrl: "/success.svg",
        imageWidth: 120,
        imageHeight: 120,
        confirmButtonText: "확인",
      });
      window.location.href = "/main";
    } catch (e) {
      Swal.fire({
        title: "탈퇴 실패",
        text: `${e.response.data.message}`,

        imageUrl: "/error.svg",
        imageWidth: 120,
        imageHeight: 120,

        showCancelButton: true,
        confirmButtonColor: "#003CFF",
        confirmButtonText: "다시 시도",
      });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-zinc-800 rounded-2xl p-8 min-w-[400px] min-h-auto relative shadow-xl">
        <button
          className="absolute right-4 top-2 text-2xl text-gray-400 hover:text-black"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-xl font-bold mb-6 text-center">스터디 멤버 목록</h2>
        <div className="flex flex-col gap-4">
          {members.map((m) => {
            const isMe = m.userId === myUserId;
            const rel = friendRelation[m.userId];
            const status = rel?.status;

            // 버튼 분기
            let rightButton = null;
            if (!isMe) {
              if (status === "ACCEPTED") {
                rightButton = (
                  <button
                    className="bg-gray-200 text-gray-500 text-xs px-2 py-2 rounded-xl shadow cursor-default"
                    disabled
                  >
                    <FaUserFriends className="inline-block" /> 친구
                  </button>
                );
              } else if (
                status === "PENDING" &&
                rel?.requesterId === myUserId
              ) {
                rightButton = (
                  <button
                    className="bg-gray-400 text-white text-xs px-2 py-2 rounded-xl shadow hover:bg-gray-500 transition"
                    disabled={loadingId === m.userId}
                    onClick={() => handleFriend(m.userId)}
                  >
                    친구 요청 중 (취소)
                  </button>
                );
              } else if (
                status === "PENDING" &&
                rel?.addresseeId === myUserId
              ) {
                rightButton = (
                  <button
                    className="bg-blue-600 text-white text-xs px-2 py-2 rounded-xl shadow hover:bg-blue-700 transition flex items-center gap-1"
                    disabled={loadingId === m.userId}
                    onClick={() => handleAccept(m.userId)}
                  >
                    친구 요청 수락
                  </button>
                );
              } else {
                rightButton = (
                  <button
                    className="bg-blue-600 text-white text-xs px-2 py-2 rounded-xl shadow hover:bg-blue-700 transition flex items-center gap-1"
                    disabled={loadingId === m.userId}
                    onClick={() => handleFriend(m.userId)}
                  >
                    <PiUserPlusFill className="inline-block" />
                    친구 추가
                  </button>
                );
              }
            } else {
              rightButton = (
                <button
                  className="text-xs px-5 py-2 bg-red-100 text-red-700 rounded-xl shadow flex items-center gap-1 hover:bg-red-200 transition"
                  onClick={handleLeave}
                >
                  <FaSignOutAlt /> 탈퇴
                </button>
              );
            }

            return (
              <div
                key={m.userId}
                className="flex items-center justify-between gap-2 border-b border-gray-100 pb-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={m.profileImageUrl || "/default.jpg"}
                    alt={m.nickname}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-bold">{m.nickname}</span>
                  {isMe && (
                    <span className="text-xs text-blue-500 ml-2">(나)</span>
                  )}
                  {m.userId !== myUserId && status === "ACCEPTED" && (
                    <FaUserFriends className="text-blue-500 ml-1" />
                  )}
                </div>
                <div>{rightButton}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
