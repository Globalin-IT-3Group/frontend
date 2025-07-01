import Swal from "sweetalert2";
import StudyRequestApi from "../../api/studyRequestAPI";
import { useState } from "react";

export default function StudyRequestFormModal({
  studyRecruitId,
  roomName,
  onClose,
}) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 성공/실패 알림
  const studyRequestAlert = (type, msg) => {
    Swal.fire({
      title: type === "success" ? "스터디 신청 성공!" : "신청 실패",
      text: msg,
      imageUrl: type === "success" ? "/success.svg" : "/error.svg",
      imageWidth: 120,
      imageHeight: 120,
      showCancelButton: false,
      confirmButtonColor: "#003CFF",
      confirmButtonText: "확인",
    });
  };

  const handleStudyRequest = async () => {
    if (!title.trim() || !message.trim()) {
      studyRequestAlert("fail", "제목과 내용을 모두 입력해 주세요.");
      return;
    }
    setLoading(true);
    try {
      await StudyRequestApi.create({ studyRecruitId, title, message });
      studyRequestAlert("success", "결과를 기다려주세요!");
      onClose(); // 성공시 모달 닫기
    } catch (e) {
      studyRequestAlert(
        "fail",
        e?.response?.data?.message
          ? `${e.response.data.message} 다시 시도해주세요.`
          : "잠시 후 다시 시도해 주세요."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative bg-gradient-to-b from-blue-100 to-white w-[700px] h-[530px] overflow-hidden dark:bg-gradient-to-b dark:from-zinc-400 dark:to-zinc-600 rounded-4xl">
        <div className="relative z-10 flex flex-col items-center mx-auto p-8">
          <div className="flex w-[650px] h-[100px] gap-4">
            <div className="flex flex-col p-4 space-y-2 mx-auto">
              <h2 className="text-2xl font-bold break-words ">
                스터디 신청서✍️
              </h2>
            </div>
          </div>

          <div>
            <div className="flex justify-center gap-x-8 mb-4">
              <div className="space-x-4">
                <span className="ml-4 font-bold mb-2 text-[#0033CF]">
                  스터디명{" "}
                </span>
                <span>{roomName}</span>
              </div>
              <div className="space-x-4 mr-4">
                <span className="ml-4 font-bold mb-2 text-[#0033CF]">
                  제목{" "}
                </span>
                <input
                  type="text"
                  className="w-[200px] border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 relative bottom-[2px]"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={30}
                  placeholder="제목을 입력하세요"
                  disabled={loading}
                />
              </div>
            </div>
            <textarea
              placeholder="간단한 자기소개, 신청 이유 등 자유롭게 작성해주세요! ✏️"
              className="w-[650px] h-[250px] bg-white flex items-start mb-2 mt-1 rounded-2xl p-8 shadow-[0_0_4px_rgba(0,0,0,0.1)] overflow-auto resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={1000}
              disabled={loading}
            />
          </div>

          <div className="flex justify-center gap-x-4 mt-4">
            <button
              className="bg-[#003CFF] px-8 py-2 rounded-3xl text-md text-white font-bold hover:bg-[#0536D7] transition-all duration-200 cursor-pointer"
              onClick={handleStudyRequest}
              disabled={loading}
            >
              {loading ? "제출 중..." : "제출"}
            </button>
            <button
              onClick={onClose}
              className="bg-white border border-gray-400 text-gray-400 px-8 py-2 rounded-3xl text-md font-bold hover:bg-gray-100 transition-all duration-200 cursor-pointer"
              disabled={loading}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
