import BaseApi from "./axiosInstance";

class StudyRequestApi extends BaseApi {
  // 1. 스터디 신청하기
  async create({ studyRecruitId, message }) {
    const res = await this.fetcher.post("/study-request", {
      studyRecruitId,
      message,
    });
    return res.data; // 신청 ID 반환 (number)
  }

  // 2. 내가 신청한 전체 내역 (페이지네이션 추가)
  async getMyRequests({ page = 0, size = 6 } = {}) {
    const res = await this.fetcher.get("/study-request/my", {
      params: { page, size },
    });
    return res.data; // Page<StudyRequestResponse>
  }

  // 3. 내가 신청한 특정 모집글의 내 신청 내역(단건)
  async getMyRequestByRecruit(studyRecruitId) {
    const res = await this.fetcher.get(`/study-request/my/${studyRecruitId}`);
    return res.data; // StudyRequestResponse
  }

  // 4. 내가 신청한 내역 취소
  async cancelMyRequest(requestId) {
    return this.fetcher.delete(`/study-request/${requestId}`);
  }

  // 5. 특정 모집글의 모든 지원자 내역 (리더 권한 필요, 페이지네이션)
  async getRequestsByRecruit({ studyRecruitId, page = 0, size = 5 }) {
    const res = await this.fetcher.get(
      `/study-request/recruit/${studyRecruitId}`,
      { params: { page, size } }
    );
    return res.data; // Page<StudyRequestResponse>
  }

  // 6. 리더가 지원 요청 승인/거절 (status: "ACCEPTED" | "REJECTED")
  async updateRequestStatus(requestId, status) {
    return this.fetcher.patch(`/study-request/${requestId}/status`, null, {
      params: { status },
    });
  }
}

export default new StudyRequestApi();
