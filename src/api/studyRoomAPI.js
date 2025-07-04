import BaseApi from "./axiosInstance";

function base64ToFile(base64Data, fileName = "image.jpg") {
  const arr = base64Data.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], fileName, { type: mime });
}

function shouldUploadImage(imageUrl) {
  return (
    imageUrl &&
    (imageUrl.startsWith("data:image") ||
      imageUrl.startsWith("blob:") ||
      imageUrl.startsWith("http")) // 외부 이미지 직접 업로드
  );
}

class StudyRoomApi extends BaseApi {
  constructor() {
    super();
  }

  // 1. 스터디룸 생성
  async createStudyRoom(data) {
    const formData = new FormData();

    // JSON에 들어갈 데이터
    const jsonData = {
      name: data.name,
      rule: data.rule,
      notice: data.notice,
      maxUserCount: data.maxUserCount,
      tags: data.tags,
    };

    // 업로드가 아닌 URL일 경우 → 그대로 JSON에 포함
    if (!shouldUploadImage(data.imageUrl) && data.imageUrl?.trim()) {
      jsonData.imageUrl = data.imageUrl;
    }

    formData.append(
      "data",
      new Blob([JSON.stringify(jsonData)], { type: "application/json" })
    );

    // 이미지 업로드가 필요한 경우 → fetch → File 변환
    if (shouldUploadImage(data.imageUrl)) {
      try {
        let file;

        if (data.imageUrl.startsWith("data:image")) {
          file = base64ToFile(data.imageUrl, "studyroom.jpg");
        } else {
          const response = await fetch(data.imageUrl);
          const blob = await response.blob();
          file = new File([blob], "studyroom.jpg", { type: blob.type });
        }

        formData.append("image", file);
      } catch (error) {
        console.warn("이미지 fetch 실패:", error);
      }
    }

    const res = await this.fetcher.post("/study-room", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
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

    const jsonData = {
      name: data.name,
      rule: data.rule,
      notice: data.notice,
      maxUserCount: data.maxUserCount,
      tags: data.tags,
    };

    if (!shouldUploadImage(data.imageUrl) && data.imageUrl?.trim()) {
      jsonData.imageUrl = data.imageUrl;
    }

    formData.append(
      "data",
      new Blob([JSON.stringify(jsonData)], { type: "application/json" })
    );

    if (shouldUploadImage(data.imageUrl)) {
      try {
        let file;

        if (data.imageUrl.startsWith("data:image")) {
          file = base64ToFile(data.imageUrl, "studyroom.jpg");
        } else {
          const response = await fetch(data.imageUrl);
          const blob = await response.blob();
          file = new File([blob], "studyroom.jpg", { type: blob.type });
        }

        formData.append("image", file);
      } catch (error) {
        console.warn("이미지 fetch 실패:", error);
      }
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
