import { useEffect, useRef, useState, useCallback } from "react";

const WS_BASE = import.meta.env.VITE_WS_URI || "wss://api.kotsu-kotsu.org";
console.log("WS_BASE: ", WS_BASE);

const SIGNAL_URL = (roomId, userId) =>
  `${WS_BASE}/ws/signal?roomId=${roomId}&userId=${userId}`;

// WebRTC 기본 STUN 서버 (Google)
const ICE_SERVERS = [{ urls: "stun:stun.l.google.com:19302" }];

export default function useVideoRoomPeer({
  studyRoomId,
  userId,
  selectedVideo,
  selectedAudio,
  videoEnabled,
  audioEnabled,
}) {
  const [peerStreams, setPeerStreams] = useState({}); // { userId: MediaStream }
  const [localStream, setLocalStream] = useState(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const pcMap = useRef({}); // userId → RTCPeerConnection
  const wsRef = useRef(null);

  // 1. localStream 준비 (카메라/마이크)
  useEffect(() => {
    let mounted = true;
    let stream;
    const getMedia = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: selectedVideo ? { deviceId: { exact: selectedVideo } } : false,
          audio: selectedAudio ? { deviceId: { exact: selectedAudio } } : false,
        });
        console.log("[WebRTC] localStream 생성됨:", stream);
        // ON/OFF 반영
        stream.getVideoTracks().forEach((t) => (t.enabled = videoEnabled));
        stream.getAudioTracks().forEach((t) => (t.enabled = audioEnabled));
        if (mounted) setLocalStream(stream);
      } catch (e) {
        // 권한 오류 등
        console.error("[WebRTC] localStream 생성 실패:", e);
        setLocalStream(null);
      }
    };
    getMedia();
    return () => {
      mounted = false;
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, [selectedVideo, selectedAudio, videoEnabled, audioEnabled]);

  // 2. 신호용 WebSocket 연결
  useEffect(() => {
    if (!userId || !studyRoomId) return;
    wsRef.current = new WebSocket(SIGNAL_URL(studyRoomId, userId));

    wsRef.current.onopen = () => {
      // 입장 시 신호
      console.log("[WebRTC] WebSocket 연결됨");
      sendSignal({ messageType: "ENTER", senderId: userId });
    };

    wsRef.current.onmessage = async (event) => {
      const msg = JSON.parse(event.data);
      console.log("[WebRTC] 신호 수신:", msg);
      if (!msg || msg.senderId === userId) return;

      switch (msg.messageType) {
        case "OFFER":
          await handleOffer(msg);
          break;
        case "ANSWER":
          await handleAnswer(msg);
          break;
        case "CANDIDATE":
          await handleCandidate(msg);
          break;
        case "ENTER":
          // 누군가 입장 → 내가 OFFER initiator
          if (localStream) createPeer(msg.senderId, true);
          break;
        case "LEAVE":
          closePeer(msg.senderId);
          break;
        default:
          break;
      }
    };

    wsRef.current.onerror = (err) => {
      console.error("[WebRTC] WebSocket 에러", err);
    };

    wsRef.current.onclose = () => {
      // 연결 해제시 정리
      console.log("[WebRTC] WebSocket 연결 종료");
      Object.values(pcMap.current).forEach((pc) => pc.close());
      pcMap.current = {};
      setPeerStreams({});
    };

    return () => {
      wsRef.current?.close();
      Object.values(pcMap.current).forEach((pc) => pc.close());
      pcMap.current = {};
      setPeerStreams({});
    };
    // eslint-disable-next-line
  }, [studyRoomId, userId, localStream]);

  // 신호 전송 함수
  const sendSignal = useCallback((data) => {
    if (wsRef.current?.readyState === 1) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  // Peer 생성 및 관리
  const closePeer = useCallback((otherId) => {
    if (pcMap.current[otherId]) {
      pcMap.current[otherId].close();
      delete pcMap.current[otherId];
    }
    setPeerStreams((prev) => {
      const { [otherId]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const createPeer = useCallback(
    (otherId, initiator = false) => {
      if (pcMap.current[otherId]) return;

      const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
      pcMap.current[otherId] = pc;

      console.log(`[WebRTC] Peer 생성: ${otherId}, initiator: ${initiator}`);

      // 내 localStream을 트랙으로 추가
      if (localStream) {
        localStream
          .getTracks()
          .forEach((track) => pc.addTrack(track, localStream));
      }

      // 상대방의 stream 받기
      pc.ontrack = (e) => {
        console.log(`[WebRTC] ontrack 수신 (상대: ${otherId})`, e.streams[0]);
        setPeerStreams((prev) => ({
          ...prev,
          [otherId]: e.streams[0],
        }));
      };

      // ICE candidate 교환
      pc.onicecandidate = (e) => {
        if (e.candidate) {
          console.log(
            `[WebRTC] ICE candidate 생성 (상대: ${otherId})`,
            e.candidate
          );
          sendSignal({
            messageType: "CANDIDATE",
            senderId: userId,
            targetId: otherId,
            candidate: e.candidate,
          });
        }
      };

      // 연결 상태 변화 감지
      pc.onconnectionstatechange = () => {
        console.log(`[WebRTC] Peer(${otherId}) 연결 상태:`, pc.connectionState);
        if (["disconnected", "failed", "closed"].includes(pc.connectionState)) {
          closePeer(otherId);
        }
      };

      // 최초 OFFER (initiator)
      if (initiator) {
        pc.createOffer()
          .then((offer) => pc.setLocalDescription(offer))
          .then(() => {
            console.log(`[WebRTC] OFFER 생성 및 전송 (상대: ${otherId})`);
            sendSignal({
              messageType: "OFFER",
              senderId: userId,
              targetId: otherId,
              sdp: pc.localDescription,
            });
          });
      }

      return pc;
    },
    [localStream, sendSignal, userId, closePeer]
  );

  // 신호 처리 함수들
  const handleOffer = useCallback(
    async (msg) => {
      const { senderId, sdp } = msg;
      console.log(`[WebRTC] OFFER 수신 (상대: ${senderId})`);
      const pc = createPeer(senderId, false);
      await pc.setRemoteDescription(new RTCSessionDescription(sdp));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      console.log(`[WebRTC] ANSWER 생성 및 전송 (상대: ${senderId})`);
      sendSignal({
        messageType: "ANSWER",
        senderId: userId,
        targetId: senderId,
        sdp: pc.localDescription,
      });
    },
    [createPeer, sendSignal, userId]
  );

  const handleAnswer = useCallback(async (msg) => {
    const { senderId, sdp } = msg;
    console.log(`[WebRTC] ANSWER 수신 (상대: ${senderId})`);
    const pc = pcMap.current[senderId];
    if (!pc) return;
    await pc.setRemoteDescription(new RTCSessionDescription(sdp));
  }, []);

  const handleCandidate = useCallback(async (msg) => {
    const { senderId, candidate } = msg;
    console.log(`[WebRTC] ICE CANDIDATE 수신 (상대: ${senderId})`, candidate);
    const pc = pcMap.current[senderId];
    if (!pc) return;
    await pc.addIceCandidate(new RTCIceCandidate(candidate));
  }, []);

  // peerStreams 변할 때마다 전체 로그
  useEffect(() => {
    console.log("[WebRTC] peerStreams 변화:", peerStreams);
  }, [peerStreams]);

  // ============ 화면공유 ===============
  const startScreenShare = useCallback(async () => {
    if (!localStream) return;
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      const videoTrack = displayStream.getVideoTracks()[0];

      // 기존 localStream의 video track 교체
      const sender = Object.values(pcMap.current)
        .flatMap((pc) => pc.getSenders())
        .find((s) => s.track && s.track.kind === "video");
      sender?.replaceTrack(videoTrack);

      setLocalStream((prev) => {
        const newStream = new MediaStream([
          videoTrack,
          ...prev.getAudioTracks(),
        ]);
        return newStream;
      });
      setIsScreenSharing(true);

      // 화면공유 끝났을 때 원래 카메라로 복구
      videoTrack.onended = async () => {
        const camStream = await navigator.mediaDevices.getUserMedia({
          video: selectedVideo ? { deviceId: { exact: selectedVideo } } : true,
        });
        const camTrack = camStream.getVideoTracks()[0];
        sender?.replaceTrack(camTrack);
        setLocalStream((prev) => {
          const newStream = new MediaStream([
            camTrack,
            ...prev.getAudioTracks(),
          ]);
          return newStream;
        });
        setIsScreenSharing(false);
      };
    } catch (e) {
      console.error("[WebRTC] 에러 ㅜㅜ: ", e);
      setIsScreenSharing(false);
    }
  }, [localStream, selectedVideo]);

  const stopScreenShare = useCallback(async () => {
    setIsScreenSharing(false);
  }, []);

  const setLocalVideoEnabled = (enabled) => {
    if (localStream) {
      localStream
        .getVideoTracks()
        .forEach((track) => (track.enabled = enabled));
    }
  };
  const setLocalAudioEnabled = (enabled) => {
    if (localStream) {
      localStream
        .getAudioTracks()
        .forEach((track) => (track.enabled = enabled));
    }
  };

  return {
    peerStreams,
    localStream,
    isScreenSharing,
    startScreenShare,
    stopScreenShare,
    setLocalVideoEnabled,
    setLocalAudioEnabled,
  };
}
