import { useEffect, useState, useRef } from "react";

export function useLocalMediaState(localStream) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const analyserRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!localStream || localStream.getAudioTracks().length === 0) {
      setIsSpeaking(false);
      return;
    }
    // 마이크 감지
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = ctx.createAnalyser();
    const micSource = ctx.createMediaStreamSource(localStream);
    analyser.fftSize = 512;
    micSource.connect(analyser);
    analyserRef.current = analyser;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const checkVolume = () => {
      analyser.getByteTimeDomainData(dataArray);
      const avg =
        dataArray.reduce((sum, v) => sum + Math.abs(v - 128), 0) /
        dataArray.length;
      setIsSpeaking(avg > 10);
      rafRef.current = requestAnimationFrame(checkVolume);
    };
    checkVolume();

    return () => {
      micSource.disconnect();
      analyser.disconnect();
      ctx.close();
      cancelAnimationFrame(rafRef.current);
    };
  }, [localStream]);

  // 캠/마이크 on/off 정보
  const isVideoOn =
    localStream && localStream.getVideoTracks().length > 0
      ? localStream.getVideoTracks()[0].enabled
      : false;
  const isAudioOn =
    localStream && localStream.getAudioTracks().length > 0
      ? localStream.getAudioTracks()[0].enabled
      : false;

  return { isSpeaking, isVideoOn, isAudioOn };
}
