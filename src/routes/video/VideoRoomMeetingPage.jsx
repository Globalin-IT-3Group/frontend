import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useVideoRoomPeer from "../../hooks/useVideoRoomPeer";
import { useLocalMediaState } from "../../hooks/useLocalMediaState";
import StudyChat from "../MyStudyRoom/StudyChat";
import { FaVideo, FaVideoSlash, FaUsers } from "react-icons/fa";
import { BsMicFill, BsMicMuteFill, BsChatDots } from "react-icons/bs";
import { TbScreenShare } from "react-icons/tb";
import { LuScreenShareOff } from "react-icons/lu";
import { ImExit } from "react-icons/im";

export default function VideoRoomMeetingPage() {
  const { studyRoomId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const myUserId = useSelector((s) => s.auth.id);

  // local camera/mic state
  const [videoEnabled, setVideoEnabled] = useState(state?.videoEnabled ?? true);
  const [audioEnabled, setAudioEnabled] = useState(state?.audioEnabled ?? true);

  const {
    peerStreams,
    localStream,
    isScreenSharing,
    startScreenShare,
    stopScreenShare,
  } = useVideoRoomPeer({
    studyRoomId,
    userId: myUserId,
    ...state,
    videoEnabled,
    audioEnabled,
  });

  const { isSpeaking, isVideoOn, isAudioOn } = useLocalMediaState(localStream);

  // 유저 더미 (실제 useUserList로 대체)
  const userList = [
    { userId: myUserId, nickname: "나" },
    ...Object.keys(peerStreams).map((uid) => ({
      userId: Number(uid),
      nickname: `유저${uid}`,
    })),
  ].slice(0, 4);

  const [showChat, setShowChat] = useState(true);
  const [showUserList, setShowUserList] = useState(false);

  // 🔥 videoRef 직접 관리! (깜박임 방지)
  const localVideoRef = useRef(null);
  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // peer videoRefs 관리 (userId별로)
  const peerVideoRefs = useRef({});
  useEffect(() => {
    Object.entries(peerStreams).forEach(([userId, stream]) => {
      if (peerVideoRefs.current[userId] && stream) {
        peerVideoRefs.current[userId].srcObject = stream;
      }
    });
  }, [peerStreams]);

  // 캠/마이크 on/off
  const handleToggleVideo = () => {
    setVideoEnabled((prev) => {
      if (localStream) {
        localStream.getVideoTracks().forEach((t) => (t.enabled = !prev));
      }
      return !prev;
    });
  };
  const handleToggleAudio = () => {
    setAudioEnabled((prev) => {
      if (localStream) {
        localStream.getAudioTracks().forEach((t) => (t.enabled = !prev));
      }
      return !prev;
    });
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-zinc-900">
      {/* 영상 그리드 */}
      <div className="flex-1 flex flex-col justify-center items-center relative">
        <div className="grid grid-cols-2 gap-4 w-full h-[60%] p-4">
          {/* 본인 */}
          <div className="relative flex flex-col items-center bg-black rounded-lg overflow-hidden">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{
                transform: "scaleX(-1)",
                border: isSpeaking
                  ? "3px solid #14cc64"
                  : "3px solid transparent",
                transition: "border 0.2s",
              }}
            />
            {/* 마이크/캠 상태 (우하단) */}
            <div className="absolute bottom-2 right-2 flex gap-1">
              {!isVideoOn && (
                <FaVideoSlash className="text-red-500 bg-white/80 rounded p-1 text-xl" />
              )}
              {!isAudioOn && (
                <BsMicMuteFill className="text-red-500 bg-white/80 rounded p-1 text-xl" />
              )}
            </div>
            <span className="absolute bottom-2 left-2 text-white bg-black/70 px-2 py-1 rounded text-xs">
              나
            </span>
          </div>
          {/* peer들 */}
          {Object.entries(peerStreams).map(([userId, stream]) => {
            // peer 캠/마이크 상태 표시
            const peerVideoOn =
              stream && stream.getVideoTracks().length > 0
                ? stream.getVideoTracks()[0].enabled
                : false;
            const peerAudioOn =
              stream && stream.getAudioTracks().length > 0
                ? stream.getAudioTracks()[0].enabled
                : false;

            return (
              <div
                key={userId}
                className="relative flex flex-col items-center bg-black rounded-lg overflow-hidden"
              >
                <video
                  ref={(el) => {
                    if (el && stream) el.srcObject = stream;
                  }}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* peer 캠/마이크 상태 (우하단) */}
                <div className="absolute bottom-2 right-2 flex gap-1">
                  {!peerVideoOn && (
                    <FaVideoSlash className="text-red-500 bg-white/80 rounded p-1 text-xl" />
                  )}
                  {!peerAudioOn && (
                    <BsMicMuteFill className="text-red-500 bg-white/80 rounded p-1 text-xl" />
                  )}
                </div>
                <span className="absolute bottom-2 left-2 text-white bg-black/70 px-2 py-1 rounded text-xs">
                  {userList.find((u) => u.userId === +userId)?.nickname ||
                    `유저${userId}`}
                </span>
              </div>
            );
          })}
        </div>
        {/* 하단 컨트롤바 */}
        <div className="absolute left-1/2 bottom-6 -translate-x-1/2 z-30 flex items-center bg-white/90 dark:bg-zinc-800/90 rounded-full px-4 py-3 gap-4 shadow-lg">
          <button
            onClick={handleToggleAudio}
            className={`rounded-full p-2 text-2xl ${
              isAudioOn ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-100"
            }`}
            title={isAudioOn ? "마이크 끄기" : "마이크 켜기"}
          >
            {isAudioOn ? <BsMicFill /> : <BsMicMuteFill />}
          </button>
          <button
            onClick={handleToggleVideo}
            className={`rounded-full p-2 text-2xl ${
              isVideoOn ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-100"
            }`}
            title={isVideoOn ? "카메라 끄기" : "카메라 켜기"}
          >
            {isVideoOn ? <FaVideo /> : <FaVideoSlash />}
          </button>
          <button
            onClick={isScreenSharing ? stopScreenShare : startScreenShare}
            className="rounded-full p-2 text-2xl bg-green-400 text-white"
            title={isScreenSharing ? "화면 공유 중지" : "화면 공유 시작"}
          >
            {isScreenSharing ? <LuScreenShareOff /> : <TbScreenShare />}
          </button>
          <button
            className="rounded-full p-2 text-2xl bg-gray-200 dark:bg-zinc-700"
            onClick={() => setShowUserList((v) => !v)}
            title="참가자 목록"
          >
            <FaUsers />
            <span className="text-base">{userList.length}</span>
          </button>
          <button
            className="rounded-full p-2 text-2xl bg-gray-200 dark:bg-zinc-700"
            onClick={() => setShowChat((v) => !v)}
            title={showChat ? "채팅창 닫기" : "채팅창 열기"}
          >
            <BsChatDots />
          </button>
          <button
            className="rounded-full p-2 text-2xl bg-red-500 text-white"
            onClick={() => navigate(-1)}
          >
            <ImExit />
          </button>
        </div>
      </div>
      {/* 우측: 채팅 패널 */}
      <div
        className={`transition-all duration-300 ${
          showChat ? "w-[350px]" : "w-0"
        } bg-white dark:bg-zinc-800 border-l h-full flex flex-col`}
      >
        {showChat && <StudyChat studyRoomId={studyRoomId} />}
      </div>
      {/* 참가자 목록 (모달/오버레이) */}
      {showUserList && (
        <div className="absolute left-4 top-4 bg-white/90 dark:bg-zinc-800/90 rounded-lg p-4 flex flex-col gap-1 shadow-xl z-40">
          <div className="font-bold mb-1">참가자</div>
          {userList.map((user) => (
            <div key={user.userId} className="text-base">
              {user.nickname} {user.userId === myUserId && "(나)"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
