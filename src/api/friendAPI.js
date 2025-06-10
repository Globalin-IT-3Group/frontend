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

  // 친구 요청 또는 취소 (isFriend: true/false 반환)
  async requestOrCancelFriend(addresseeId) {
    const res = await this.fetcher.post("/friend/request", { addresseeId });
    return res.data;
  }

  // 내가 보낸 친구 요청 목록
  async getMyRequests() {
    const res = await this.fetcher.get("/friend/my-request");
    return res.data;
  }

  // 내가 받은 친구 요청 목록
  async getMyPendingRequests() {
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
