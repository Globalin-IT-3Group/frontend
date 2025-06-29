import BaseApi from "./axiosInstance";

class ChatRoomApi extends BaseApi {
  constructor() {
    super();
  }

  async getOrCreateSingleRoom({ requesterId, targetId }) {
    const res = await this.fetcher.post("/chat-room", {
      requesterId,
      targetId,
    });
    return res.data;
  }

  async markAsRead(roomId) {
    // 읽음 처리용 API 호출 (POST or PATCH 등으로 백엔드에서 구현)
    // 예시: POST /chat-room/{roomId}/read
    await this.fetcher.post(`/chat-room/${roomId}/read`);
  }

  // ✅ 모든 채팅방 요약 정보 가져오기 (더미 데이터 반환)
  async getAllSummaries() {
    const res = await this.fetcher.get("/chat-room/summary/all");

    const DEFAULT_IMG = "/6.jpg";

    const data = (res.data || []).map((room) => ({
      ...room,
      otherUser: {
        ...room.otherUser,
        profileImage: room.otherUser.profileImage || DEFAULT_IMG,
      },
    }));

    console.log(res);

    return data;
  }

  async getOrCreateGroupRoom({ studyRoomId, memberIds }) {
    const res = await this.fetcher.post("/chat-room/group", {
      studyRoomId,
      memberIds,
    });
    return res.data;
  }
}

export default new ChatRoomApi();
