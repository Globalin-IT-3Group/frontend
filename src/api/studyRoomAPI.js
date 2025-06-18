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

    // 예시 더미 데이터
    // return Promise.resolve([
    //   {
    //     id: 1,
    //     name: "JLPT 합격 스터디",
    //     imageUrl:
    //       "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg",
    //     tags: ["JLPT", "스터디"],
    //     leaderId: 2,
    //     currentMemberCount: 3,
    //     maxUserCount: 4,
    //   },
    //   {
    //     id: 2,
    //     name: "회화 스터디",
    //     imageUrl:
    //       "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg",
    //     tags: ["회화"],
    //     leaderId: 99,
    //     currentMemberCount: 2,
    //     maxUserCount: 4,
    //   },
    //   {
    //     id: 3,
    //     name: "비즈니스 일본어",
    //     imageUrl:
    //       "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg",
    //     tags: ["비즈니스일본어"],
    //     leaderId: 10,
    //     currentMemberCount: 1,
    //     maxUserCount: 4,
    //   },
    // ]);
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
