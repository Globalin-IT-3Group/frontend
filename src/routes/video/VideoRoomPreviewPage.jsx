import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import VideoRoomApi from "../../api/videoRoomAPI";
import { FaVideo, FaVideoSlash } from "react-icons/fa";
import { BsMicFill, BsMicMuteFill } from "react-icons/bs";
import { HiArrowLeft } from "react-icons/hi2";

export default function VideoRoomPreviewPage() {
  const { studyRoomId } = useParams();
  const [hasRoom, setHasRoom] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const videoRef = useRef(null);

  const [mediaStream, setMediaStream] = useState(null);
  const [videoDevices, setVideoDevices] = useState([]);
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [selectedAudio, setSelectedAudio] = useState("");
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  // 🔥 마이크 볼륨 감지용
  const [isSpeaking, setIsSpeaking] = useState(false);
  const analyserRef = useRef(null);
  const rafRef = useRef(null);

  // (1) 방 존재 체크
  useEffect(() => {
    setLoading(true);
    VideoRoomApi.exists(studyRoomId)
      .then(setHasRoom)
      .finally(() => setLoading(false));
  }, [studyRoomId]);

  // (2) mount 시 권한 먼저 요청 → 그 후 장치 탐색!
  useEffect(() => {
    let didCancel = false;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(() => {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
          if (didCancel) return;
          const videos = devices.filter((d) => d.kind === "videoinput");
          const audios = devices.filter((d) => d.kind === "audioinput");
          setVideoDevices(videos);
          setAudioDevices(audios);
          if (!selectedVideo && videos.length > 0)
            setSelectedVideo(videos[0].deviceId);
          if (!selectedAudio && audios.length > 0)
            setSelectedAudio(audios[0].deviceId);
        });
      })
      .catch(() => {
        alert("카메라/마이크 권한을 허용해야 합니다");
      });
    return () => {
      didCancel = true;
    };
    // eslint-disable-next-line
  }, []);

  // (3) 선택 장치 바뀔 때마다 미리보기 스트림 연결
  useEffect(() => {
    let localStream = null;
    if (!selectedVideo && !selectedAudio) return;
    navigator.mediaDevices
      .getUserMedia({
        video: selectedVideo ? { deviceId: { exact: selectedVideo } } : false,
        audio: selectedAudio ? { deviceId: { exact: selectedAudio } } : false,
      })
      .then((stream) => {
        localStream = stream;
        setMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(() => {
        alert("카메라/마이크 권한을 허용해야 합니다");
      });

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [selectedVideo, selectedAudio]);

  // (4) ON/OFF 반영
  useEffect(() => {
    if (!mediaStream) return;
    mediaStream
      .getVideoTracks()
      .forEach((track) => (track.enabled = videoEnabled));
    mediaStream
      .getAudioTracks()
      .forEach((track) => (track.enabled = audioEnabled));
  }, [videoEnabled, audioEnabled, mediaStream]);

  // (5) 마이크 감지 로직
  useEffect(() => {
    if (!mediaStream) return;
    if (!audioEnabled) {
      setIsSpeaking(false);
      return;
    }
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const micSource = audioContext.createMediaStreamSource(mediaStream);
    analyser.fftSize = 512;
    micSource.connect(analyser);
    analyserRef.current = analyser;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const checkVolume = () => {
      analyser.getByteTimeDomainData(dataArray);
      // 볼륨이 특정 임계치 넘으면 "말하는 중" 처리
      const avg =
        dataArray.reduce((sum, v) => sum + Math.abs(v - 128), 0) /
        dataArray.length;
      setIsSpeaking(avg > 10); // (값은 조정 가능)
      rafRef.current = requestAnimationFrame(checkVolume);
    };
    checkVolume();

    return () => {
      micSource.disconnect();
      analyser.disconnect();
      audioContext.close();
      cancelAnimationFrame(rafRef.current);
    };
  }, [mediaStream, audioEnabled]);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <div
        className="w-full max-w-xm sm:max-w-md md:max-w-lg lg:max-w-2xl 
             flex items-center mb-4 mx-auto"
      >
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-gray-700 rounded-full"
        >
          <HiArrowLeft className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mx-auto">화상 채팅방 미리보기</h2>
      </div>

      {/* 비디오 미리보기 + 음성 감지 테두리 */}
      <div
        className={`
            w-full max-w-xm sm:max-w-md md:max-w-lg lg:max-w-2xl aspect-video 
            bg-gray-200 rounded-xl flex items-center justify-center overflow-hidden border-2
            transition-all duration-200 relative
            ${
              isSpeaking
                ? "border-green-400 shadow-[0_0_0_4px_#22c55e]"
                : "border-gray-300"
            }
        `}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{ transform: "scaleX(-1)" }}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 카메라/마이크 선택, ON/OFF 등 아래 그대로 */}
      <div className="flex flex-col gap-2 w-full max-w-[440px]">
        <div className="flex items-center gap-2 w-full">
          <FaVideo className="flex-shrink-0 w-6 h-6" />
          <select
            value={selectedVideo}
            onChange={(e) => setSelectedVideo(e.target.value)}
            className="p-2 rounded border w-full"
          >
            {videoDevices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || "카메라"}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 w-full">
          <BsMicFill className="flex-shrink-0 w-6 h-6" />
          <select
            value={selectedAudio}
            onChange={(e) => setSelectedAudio(e.target.value)}
            className="p-2 rounded border w-full"
          >
            {audioDevices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || "마이크"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <button
          className={`px-4 py-2 rounded flex items-center gap-2 ${
            videoEnabled ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setVideoEnabled((v) => !v)}
        >
          {videoEnabled ? <FaVideo /> : <FaVideoSlash />}
          {videoEnabled ? "카메라 OFF" : "카메라 ON"}
        </button>
        <button
          className={`px-4 py-2 rounded flex items-center gap-2 ${
            audioEnabled ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setAudioEnabled((v) => !v)}
        >
          {audioEnabled ? <BsMicFill /> : <BsMicMuteFill />}
          {audioEnabled ? "마이크 OFF" : "마이크 ON"}
        </button>
      </div>

      <button
        className="bg-blue-500 text-white rounded px-6 py-2 mt-6"
        onClick={() =>
          navigate(`/video-room/meeting/${studyRoomId}`, {
            state: {
              selectedVideo,
              selectedAudio,
              videoEnabled,
              audioEnabled,
            },
          })
        }
      >
        {hasRoom ? "참여하기" : "방 생성하기"}
      </button>
    </div>
  );
}
