let socket = null;

const backendURL = import.meta.env.VITE_BASE_DOMAIN;

const chatSocket = {
  connect(roomId, userId, onMessage) {
    if (socket) socket.close();

    socket = new WebSocket(
      `ws://${backendURL}/ws/study?roomId=${roomId}&userId=${userId}`
    );

    socket.onopen = () => {
      console.log("✅ WebSocket 연결됨");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("💬 메시지 수신:", data);
      if (onMessage) onMessage(data);
    };

    socket.onerror = (err) => {
      console.error("❌ WebSocket 에러:", err);
    };

    socket.onclose = () => {
      console.log("🔌 WebSocket 연결 종료");
    };
  },

  send(messageObject) {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(messageObject));
    } else {
      console.warn("🚫 WebSocket이 열려있지 않습니다.");
    }
  },

  disconnect() {
    if (socket) {
      socket.close();
      socket = null;
    }
  },
};

export default chatSocket;
