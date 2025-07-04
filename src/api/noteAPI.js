import BaseApi from "./axiosInstance";

function base64ToFile(base64Data, fileName) {
  const arr = base64Data.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
}

class NoteApi extends BaseApi {
  constructor() {
    super();
  }

  // 노트 목록 조회
  async getNotes() {
    const res = await this.fetcher.get("/note/");
    return res.data;
  }

  // 노트 상세 조회
  async getNote(noteId) {
    const res = await this.fetcher.get(`/note/${noteId}`);
    return res.data;
  }

  // 노트 작성
  async createNote({ title, content, imageUrl }) {
    const formData = new FormData();

    // NoteRequest는 JSON 형태로 Blob으로 감싸기
    const noteObj = { title, content };
    formData.append(
      "note",
      new Blob([JSON.stringify(noteObj)], { type: "application/json" })
    );

    // 이미지 처리 분기
    if (imageUrl) {
      if (typeof imageUrl === "string") {
        // case 1. base64 이미지일 경우
        if (imageUrl.startsWith("data:image")) {
          const file = base64ToFile(imageUrl, "note-image.jpg");
          formData.append("image", file);
        }
        // case 2. 일반 URL일 경우 (업로드 필요 없음 → 백엔드에 포함해야 함)
        else if (imageUrl.startsWith("http")) {
          noteObj.imageUrl = imageUrl;
          // 다시 Blob으로 업데이트
          formData.set(
            "note",
            new Blob([JSON.stringify(noteObj)], { type: "application/json" })
          );
        }
      } else if (imageUrl instanceof File) {
        // case 3. File 객체일 경우
        formData.append("image", imageUrl);
      }
    }

    const res = await this.fetcher.post("/note/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  }

  //노트 수정
  async updateNote(noteId, { title, content, imageUrl }) {
    const formData = new FormData();

    const noteObj = { title, content };

    // 이미지 처리 분기
    if (imageUrl) {
      if (typeof imageUrl === "string") {
        // 📌 case 1: base64 이미지일 경우 → File로 변환해서 업로드
        if (imageUrl.startsWith("data:image")) {
          const file = base64ToFile(imageUrl, "note-image.jpg");
          formData.append("image", file);
        }
        // 📌 case 2: 기존 URL을 그대로 재사용할 경우 → note 객체에 포함
        else if (imageUrl.startsWith("http")) {
          noteObj.imageUrl = imageUrl;
        }
      }
      // 📌 case 3: File 객체일 경우
      else if (imageUrl instanceof File) {
        formData.append("image", imageUrl);
      }
    }

    // note 정보는 항상 최신화된 JSON으로 append
    formData.append(
      "note",
      new Blob([JSON.stringify(noteObj)], { type: "application/json" })
    );

    const res = await this.fetcher.put(`/note/${noteId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  }

  // 노트 삭제
  async deleteNote(noteId) {
    const res = await this.fetcher.delete(`/note/${noteId}`);
    return res.data;
  }

  // 노트 제목으로 검색
  async searchMyNotes(title) {
    const res = await this.fetcher.get(`/note/search`, {
      params: { title },
    });
    return res.data;
  }
}

export default new NoteApi();
