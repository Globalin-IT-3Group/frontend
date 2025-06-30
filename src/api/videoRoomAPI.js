import BaseApi from "./axiosInstance";

class VideoRoomApi extends BaseApi {
  constructor() {
    super();
  }

  // ✅ 화상방 존재 유무(참여/생성 판단)
  async exists(studyRoomId) {
    const res = await this.fetcher.get(`/video-room/exists/${studyRoomId}`);
    return res.data; // true or false
  }

  // ✅ 화상방 입장 (SYSTEM 메시지 전송)
  async enter(roomId) {
    await this.fetcher.post(`/video-room/enter/${roomId}`);
  }

  // ✅ 화상방 퇴장 (SYSTEM 메시지 전송)
  async leave(roomId) {
    await this.fetcher.post(`/video-room/leave/${roomId}`);
  }
}

export default new VideoRoomApi();
