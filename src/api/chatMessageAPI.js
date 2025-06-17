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

    // 백엔드 대신 더미 데이터 반환
    // return Promise.resolve([
    //   {
    //     senderId: 1,
    //     message: "이건 상대방 메시지입니다.",
    //     sentAt: "2025-06-10T12:00:00Z",
    //   },
    //   {
    //     senderId: 2,
    //     message: "이건 내 메시지예요.",
    //     sentAt: "2025-06-10T12:01:00Z",
    //   },
    // ]);
  }
}

export default new ChatMessageApi();
