import { useEffect, useRef, useState, useCallback } from "react";

export default function usePersistentWebSocket(url, onMessage, deps = []) {
  const wsRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const retryCountRef = useRef(0);

  const connect = useCallback(() => {
    wsRef.current = new window.WebSocket(url);
    wsRef.current.onopen = () => {
      setConnected(true);
      retryCountRef.current = 0;
    };
    wsRef.current.onmessage = (event) => {
      if (onMessage) onMessage(JSON.parse(event.data));
    };
    wsRef.current.onclose = () => {
      setConnected(false);
      // 재연결 (최대 5회, 2초 간격)
      if (retryCountRef.current < 5) {
        setTimeout(() => {
          retryCountRef.current += 1;
          connect();
        }, 2000);
      }
    };
    wsRef.current.onerror = () => {
      wsRef.current.close();
    };
  }, [url, onMessage]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current && wsRef.current.close();
    };
    // url, onMessage, deps가 바뀔 때마다 연결
    // eslint-disable-next-line
  }, [url, ...deps]);

  // 외부에서 메시지 전송
  const send = (data) => {
    if (wsRef.current && wsRef.current.readyState === 1) {
      wsRef.current.send(JSON.stringify(data));
    }
  };

  return { connected, send };
}
