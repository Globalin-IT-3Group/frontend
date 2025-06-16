import BaseApi from "./axiosInstance";

class FriendApi extends BaseApi {
  constructor() {
    super();
  }

  // 친구 목록 조회
  async getFriends() {
    const res = await this.fetcher.get("/friend/");
    return res.data;
  }

  // 친구 상태 단건 조회
  async getFriendRelation(targetUserId) {
    const res = await this.fetcher.get(`/friend/status/${targetUserId}`);
    return res.data?.data || null;
  }

  // 친구 요청/취소
  async requestOrCancelFriend(addresseeId) {
    // POST /friend/request { addresseeId }
    const res = await this.fetcher.post("/friend/request", { addresseeId });
    return res.data.data; // true(요청됨) | false(취소됨)
  }

  // 내가 보낸 친구 요청 목록
  async getRequestedFriends() {
    const res = await this.fetcher.get("/friend/my-request");
    return res.data;
  }

  // 내가 받은 친구 요청 목록
  async getReceivedRequests() {
    const res = await this.fetcher.get("/friend/my-accept");
    return res.data;
  }

  // 친구 삭제
  async deleteFriend(friendId) {
    const res = await this.fetcher.delete(`/friend/${friendId}`);
    return res.data;
  }

  // 친구 요청 수락
  async acceptFriendRequest(requesterId) {
    const res = await this.fetcher.post("/friend/accept", { requesterId });
    return res.data;
  }
}

export default new FriendApi();
