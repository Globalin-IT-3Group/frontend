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

    // 백엔드 대신 더미 데이터 반환
    // return Promise.resolve([
    //   {
    //     roomId: 1,
    //     unreadCount: 2,
    //     lastMessage: "안녕하세요! 오랜만이에요.",
    //     lastMessageAt: "2025-06-10T12:10:00Z",
    //     otherUser: {
    //       id: 10,
    //       nickname: "상대방",
    //       profileImage: "https://randomuser.me/api/portraits/men/10.jpg",
    //       profileMessage: "친하게 지내요!",
    //     },
    //   },
    //   {
    //     roomId: 2,
    //     unreadCount: 0,
    //     lastMessage: "다음 주에 만나요!",
    //     lastMessageAt: "2025-06-10T11:30:00Z",
    //     otherUser: {
    //       id: 21,
    //       nickname: "홍길동",
    //       profileImage: "https://randomuser.me/api/portraits/men/21.jpg",
    //       profileMessage: "프론트엔드 개발자",
    //     },
    //   },
    // ]);
  }
}

export default new ChatRoomApi();
