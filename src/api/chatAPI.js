import BaseApi from "./axiosInstance";

class ChatApi extends BaseApi {
  constructor() {
    super();
  }

  // 1. 채팅방 생성 또는 조회 (1:1)
  async getOrCreateSingleRoom(requesterId, targetId) {
    const res = await this.fetcher.post("/chat-room/chat/room", {
      requesterId,
      targetId,
    });
    return res.data; // ChatRoomResponse
  }

  // 2. 채팅방 미확인 메시지 수 조회
  async getUnreadCount(roomId) {
    const res = await this.fetcher.get(`/chat-room/${roomId}/unread`);
    return res.data; // 정수값
  }

  // 3. 채팅방 메시지 내역 조회
  async getChatMessages(roomId) {
    const res = await this.fetcher.get(
      `/chat-message/rooms/${roomId}/messages`
    );
    return res.data; // ChatMessage[]
  }
}

export default new ChatApi();
