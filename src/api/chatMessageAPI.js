import BaseApi from "./axiosInstance";

class ChatMessageApi extends BaseApi {
  constructor() {
    super();
  }

  // ✅ 특정 채팅방의 메시지 전체 조회
  async getMessagesByRoomId(roomId) {
    const res = await this.fetcher.get(
      `/chat-message/rooms/${roomId}/messages`
    );
    return res.data;
  }

  // ✅ 그룹(스터디방) 채팅 메시지 조회
  async getGroupMessagesByRoomId(roomId) {
    const res = await this.fetcher.get(
      `/chat-message/rooms/${roomId}/group-messages`
    );
    return res.data;
  }

  async markAsRead(roomId, lastReadAt) {
    await this.fetcher.post(`/chat-message/rooms/${roomId}/read`, {
      lastReadAt,
    });
  }
}

export default new ChatMessageApi();
