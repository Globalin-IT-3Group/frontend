import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { PiUserPlusFill } from "react-icons/pi";
import friendAPI from "../../api/friendAPI";

export default function ProfileModal({ open, onClose, user, myId }) {
  const [friendRelation, setFriendRelation] = useState(null);
  const [loading, setLoading] = useState(false);

  const isMe = user && user.id === myId;
  const status = friendRelation?.status;
  const iRequested =
    friendRelation &&
    status === "PENDING" &&
    friendRelation.requesterId === myId;
  const iAmAddressee =
    friendRelation &&
    status === "PENDING" &&
    friendRelation.addresseeId === myId;

  // 모달이 열릴 때마다 친구관계 조회
  useEffect(() => {
    if (open && user && user.id && user.id !== myId) {
      setLoading(true);
      friendAPI
        .getFriendRelation(user.id)
        .then(setFriendRelation)
        .catch(() => setFriendRelation(null))
        .finally(() => setLoading(false));
    } else {
      setFriendRelation(null);
      setLoading(false);
    }
  }, [open, user, myId]);

  // 친구 추가/취소/수락 후 relation 재조회
  const refreshRelation = async () => {
    setLoading(true);
    try {
      const relation = await friendAPI.getFriendRelation(user.id);
      setFriendRelation(relation);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFriend = async () => {
    setLoading(true);
    try {
      await friendAPI.requestOrCancelFriend(user.id);
      await refreshRelation();
    } catch {
      alert("친구 요청 실패");
      setLoading(false);
    }
  };

  const handleCancelRequest = async () => {
    setLoading(true);
    try {
      await friendAPI.requestOrCancelFriend(user.id);
      await refreshRelation();
    } catch {
      alert("취소 실패");
      setLoading(false);
    }
  };

  const handleAcceptRequest = async () => {
    setLoading(true);
    try {
      await friendAPI.acceptFriendRequest(user.id);
      await refreshRelation();
    } catch {
      alert("수락 실패");
      setLoading(false);
    }
  };

  if (!open || !user) return null;

  // 버튼 분기
  let buttonContent = null;
  if (!isMe) {
    if (status === "ACCEPTED") {
      buttonContent = (
        <button
          className="bg-gray-200 text-gray-500 px-5 py-2 rounded-xl shadow cursor-default"
          disabled
        >
          이미 친구예요!
        </button>
      );
    } else if (status === "PENDING" && iRequested) {
      buttonContent = (
        <button
          className="bg-gray-400 text-white px-5 py-2 rounded-xl shadow hover:bg-gray-500 transition"
          onClick={handleCancelRequest}
          disabled={loading}
        >
          요청 중 (취소)
        </button>
      );
    } else if (status === "PENDING" && iAmAddressee) {
      buttonContent = (
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition"
          onClick={handleAcceptRequest}
          disabled={loading}
        >
          친구 요청 수락
        </button>
      );
    } else {
      buttonContent = (
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700 transition flex items-center gap-1"
          onClick={handleAddFriend}
          disabled={loading}
        >
          <PiUserPlusFill className="inline-block" />
          친구 추가
        </button>
      );
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xs relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          <AiOutlineClose size={24} />
        </button>
        <div className="flex flex-col items-center gap-3">
          <img
            src={
              user.profileImage ||
              "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg"
            }
            alt="profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="text-xl font-bold flex items-center gap-2">
            {user.nickname}
            {status === "ACCEPTED" && !isMe && (
              <FaUserFriends className="text-blue-500" title="친구" />
            )}
          </div>
          <div className="text-gray-500 text-sm min-h-8 text-center break-words">
            {user.profileMessage || "상태 메시지가 없습니다."}
          </div>
        </div>
        {!isMe && (
          <div className="mt-6 flex justify-center">{buttonContent}</div>
        )}
      </div>
    </div>
  );
}
