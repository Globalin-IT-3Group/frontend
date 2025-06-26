import BaseApi from "./axiosInstance";

class StudyRoomApi extends BaseApi {
  constructor() {
    super();
  }

  // 1. 스터디룸 생성
  async createStudyRoom(data) {
    // data: { name, rule, notice, imageUrl, maxUserCount, tags }
    const res = await this.fetcher.post("/study-room", data);
    return res.data; // StudyRoomDto
  }

  // 2. 스터디룸 목록 조회
  async getStudyRoomList() {
    const res = await this.fetcher.get("/study-room");
    return res.data; // Array<StudyRoomSummaryDto>
  }

  // 3. 스터디룸 상세 조회
  async getStudyRoomDetail(id) {
    const res = await this.fetcher.get(`/study-room/${id}`);
    return res.data; // StudyRoomDetailDto
  }

  // 4. 스터디룸 수정
  async updateStudyRoom(id, data) {
    // data: { name, rule, notice, imageUrl, maxUserCount, tags }
    const res = await this.fetcher.put(`/study-room/${id}`, data);
    return res.data; // StudyRoomDto
  }

  // 5. 스터디룸 삭제
  async deleteStudyRoom(id) {
    const res = await this.fetcher.delete(`/study-room/${id}`);
    return res.data; // 없음 (204 No Content)
  }
}

export default new StudyRoomApi();
