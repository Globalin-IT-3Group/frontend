import { useEffect, useState } from "react";
import friendAPI from "../../api/friendAPI"; // 실제 경로 맞게
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ChatRoomApi from "../../api/chatRoomAPI";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const TAB_LIST = [
  { label: "친구 목록", key: "friend" },
  { label: "받은 요청", key: "received" },
  { label: "요청 중", key: "pending" },
];

export default function FriendListModal({ open, onClose }) {
  const [activeTab, setActiveTab] = useState(TAB_LIST[0].key);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = useSelector((state) => state.auth.id);
  const navigate = useNavigate();

  const rejectConfirm = async () => {
    const result = await Swal.fire({
      title: "친구 요청을 거절하시겠습니까?",
      text: "거절 후 취소는 불가능합니다.",
      imageUrl: "/question.svg",
      imageWidth: 120,
      imageHeight: 120,
      showCancelButton: true,
      confirmButtonColor: "#003CFF",
      cancelButtonColor: "#D9D9D9",
      confirmButtonText: "거절",
      cancelButtonText: "취소",
    });
    return result.isConfirmed;
  };

  const deleteConfirm = async () => {
    const result = await Swal.fire({
      title: "친구를 삭제하시겠습니까?",
      text: "삭제 후 취소는 불가능합니다.",
      imageUrl: "/question.svg",
      imageWidth: 120,
      imageHeight: 120,
      showCancelButton: true,
      confirmButtonColor: "#003CFF",
      cancelButtonColor: "#D9D9D9",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    });
    return result.isConfirmed;
  };

  // 탭에 따라 API 호출
  useEffect(() => {
    if (!open) return;
    setLoading(true);
    let fetcher;
    if (activeTab === "friend") {
      fetcher = friendAPI.getFriends();
    } else if (activeTab === "received") {
      fetcher = friendAPI.getReceivedRequests();
    } else if (activeTab === "pending") {
      fetcher = friendAPI.getRequestedFriends();
    }
    fetcher.then(setList).finally(() => setLoading(false));
  }, [open, activeTab]);

  const handleChat = async (otherUser) => {
    const res = await ChatRoomApi.getOrCreateSingleRoom({
      requesterId: userId, // 내 ID
      targetId: otherUser.id, // 친구 ID
    });

    navigate(`/chat?roomId=${res.id}`, {
      state: { otherUser },
    });
  };

  // 친구 삭제
  const handleDelete = async (userId) => {
    const confirmed = await deleteConfirm();
    if (!confirmed) return;

    try {
      await friendAPI.deleteFriend(userId);
      setList(list.filter((u) => u.id !== userId));
    } catch (err) {
      console.error("친구 삭제 에러:", err);
      alert("친구를 삭제하는 중 문제가 발생했습니다");
    }
  };

  // 요청 수락
  const handleAccept = async (requesterId) => {
    await friendAPI.acceptFriendRequest(requesterId);
    setList(list.filter((u) => u.id !== requesterId));
  };

  // 요청 취소
  const handleCancel = async (addresseeId) => {
    await friendAPI.requestOrCancelFriend(addresseeId);
    setList(list.filter((u) => u.id !== addresseeId));
  };

  //요청 거절
  const handleRejectRequest = async (requesterId) => {
    const confirmed = await rejectConfirm();
    if (!confirmed) return;

    try {
      await friendAPI.rejectFriendRequest(requesterId);
      setList(list.filter((u) => u.id !== requesterId));
    } catch (err) {
      console.error("요청 거절 에러:", err);
      alert("요청을 거절하는 중 문제가 발생했습니다");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-700 rounded-2xl shadow-2xl p-8 w-full max-w-lg relative transform transform scale-[0.8] sm:scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          <AiOutlineClose size={22} />
        </button>
        {/* 탭 */}
        <div className="flex gap-4 mb-6">
          {TAB_LIST.map((tab) => (
            <button
              key={tab.key}
              className={`py-2 px-4 font-bold rounded-xl ${
                activeTab === tab.key
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-500"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* 리스트 */}
        <div className="min-h-[320px]">
          {loading ? (
            <div className="text-center py-10">불러오는 중...</div>
          ) : list.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              데이터가 없습니다.
            </div>
          ) : (
            <ul className="space-y-4">
              {list.map((user) => (
                <li key={user.id} className="flex items-center gap-4">
                  <img
                    src={
                      user.profileImage ||
                      "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg"
                    }
                    className="w-10 h-10 rounded-full object-cover"
                    alt="프로필"
                  />
                  <div className="flex-1">
                    <div className="font-bold">{user.nickname}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-100">
                      {user.profileMessage || "상태 메시지 없음"}
                    </div>
                  </div>
                  {activeTab === "friend" && (
                    <>
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded-xl hover:bg-blue-600 mr-2"
                        onClick={() => handleChat(user)}
                      >
                        채팅
                      </button>
                      <button
                        className="px-3 py-1 bg-red-100 text-red-600 rounded-xl hover:bg-red-200"
                        onClick={() => handleDelete(user.id)}
                      >
                        절교
                      </button>
                    </>
                  )}
                  {activeTab === "received" && (
                    <>
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                        onClick={() => handleAccept(user.id)}
                      >
                        수락
                      </button>
                      <button
                        className="px-3 py-1 bg-red-100 text-red-600 rounded-xl hover:bg-red-200"
                        onClick={() => handleRejectRequest(user.id)}
                      >
                        거절
                      </button>
                    </>
                  )}
                  {activeTab === "pending" && (
                    <button
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400"
                      onClick={() => handleCancel(user.id)}
                    >
                      요청 취소
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
