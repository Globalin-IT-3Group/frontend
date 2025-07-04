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
  async getAllSummaries(myUserId) {
    const res = await this.fetcher.get("/chat-room/summary/all");

    const DEFAULT_IMG = "/6.jpg";

    const data = (res.data || []).map((room) => {
      const isAlone =
        room.roomType === "SINGLE" &&
        room.otherUsers?.length === 1 &&
        room.otherUsers[0]?.id === myUserId;

      const displayUser = isAlone ? null : room.otherUsers?.[0] || null;

      return {
        ...room,
        otherUser: displayUser
          ? {
              ...displayUser,
              profileImage: displayUser.profileImage || DEFAULT_IMG,
            }
          : null,
      };
    });

    return data;
  }

  async getOrCreateGroupRoom({ studyRoomId, memberIds }) {
    const res = await this.fetcher.post("/chat-room/group", {
      studyRoomId,
      memberIds,
    });
    return res.data;
  }

  async getGroupChatRoomIdByStudyRoomId(studyRoomId) {
    const res = await this.fetcher.get(
      `/chat-room/study/${studyRoomId}/group-id`
    );
    return res.data; // 그냥 id 숫자 하나 반환
  }

  async getStudyRoomIdByChatRoomId(chatRoomId) {
    const res = await this.fetcher.get(`/chat-room/${chatRoomId}/study-id`);
    return res.data;
  }
}

export default new ChatRoomApi();
