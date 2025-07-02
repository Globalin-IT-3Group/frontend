import BaseApi from "./axiosInstance";

class StudyRoomApi extends BaseApi {
  constructor() {
    super();
  }

  // 1. 스터디룸 생성
  async createStudyRoom(data) {
    const formData = new FormData();

    // JSON 데이터를 Blob으로 만들어 "data" 필드로 추가
    const jsonBlob = new Blob(
      [
        JSON.stringify({
          name: data.name,
          rule: data.rule,
          notice: data.notice,
          maxUserCount: data.maxUserCount,
          tags: data.tags,
        }),
      ],
      { type: "application/json" }
    );

    formData.append("data", jsonBlob);

    // imageUrl이 존재한다면 이미지 URL을 fetch하여 Blob → File 변환 후 "image"로 추가
    if (data.imageUrl?.trim()) {
      try {
        const response = await fetch(data.imageUrl);
        const blob = await response.blob();
        const filename = "image.jpg"; // 적당한 이름 (실제 저장은 서버에서 처리)

        const file = new File([blob], filename, { type: blob.type });
        formData.append("image", file);
      } catch (error) {
        console.warn("이미지 fetch 실패:", error);
        // 이미지 없이 진행 (imageFile 생략)
      }
    }

    const res = await this.fetcher.post("/study-room", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

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
    const formData = new FormData();

    // JSON 데이터를 Blob으로 감싸서 "data" 파트로 보냄
    const jsonBlob = new Blob(
      [
        JSON.stringify({
          name: data.name,
          rule: data.rule,
          notice: data.notice,
          maxUserCount: data.maxUserCount,
          tags: data.tags,
        }),
      ],
      { type: "application/json" }
    );

    formData.append("data", jsonBlob);

    // imageUrl이 존재할 경우: fetch로 이미지 불러와서 Blob → File 변환 후 추가
    if (data.imageUrl?.trim()) {
      const response = await fetch(data.imageUrl);
      const blob = await response.blob();

      const filename = "image.jpg"; // 파일명은 임의로 설정 (서버에서 UUID 등으로 처리해줄 수 있음)
      const file = new File([blob], filename, { type: blob.type });

      formData.append("image", file);
    }

    const res = await this.fetcher.put(`/study-room/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  }

  // 5. 스터디룸 삭제
  async deleteStudyRoom(id) {
    const res = await this.fetcher.delete(`/study-room/${id}`);
    return res.data; // 없음 (204 No Content)
  }

  // 6. 스터디룸 탈퇴 (멤버가 방 나가기)
  async leaveStudyRoom(id) {
    const res = await this.fetcher.delete(`/study-room/${id}/leave`);
    return res.data; // 없음 (204 No Content)
  }
}

export default new StudyRoomApi();
