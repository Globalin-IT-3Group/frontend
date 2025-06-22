import BaseApi from "./axiosInstance";
import qs from "qs";

class StudyRecruitApi extends BaseApi {
  async getStudyRecruit({ sortBy = "latest", tags = [], page = 0, size = 6 }) {
    let sort = "createdAt,desc";
    if (sortBy === "mostView") sort = "viewCount,desc";
    const params = { page, size, sort, tags };

    const res = await this.fetcher.get("/study-recruit", {
      params,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "repeat" }),
    });
    return res.data;
  }

  // 검색 (페이지네이션, title 기준)
  async searchStudyRecruit({ title = "", page = 0, size = 6 }) {
    const res = await this.fetcher.get("/study-recruit/search", {
      params: { title, page, size, sort: "createdAt,desc" },
    });
    return res.data;
  }

  async createRecruit({ studyRoomId, title, studyExplain, isOpen }) {
    return this.fetcher.post("/study-recruit", {
      studyRoomId,
      title,
      studyExplain,
      isOpen,
    });
  }

  // 수정
  async updateRecruit({ recruitId, studyRoomId, title, studyExplain, isOpen }) {
    return this.fetcher.put(`/study-recruit/${recruitId}`, {
      studyRoomId,
      title,
      studyExplain,
      isOpen,
    });
  }

  async getStudyRecruitInStudyRoom(studyRoomId) {
    const res = await this.fetcher.get(`/study-recruit/${studyRoomId}`);
    return res.data;
  }

  // 모집글 조회수 증가
  async increaseViewCount(recruitId) {
    return this.fetcher.patch(`/study-recruit/${recruitId}/view`);
  }
}

export default new StudyRecruitApi();
