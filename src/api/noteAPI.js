import BaseApi from "./axiosInstance";

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

    // NoteRequest는 JSON 형태로 보내기
    const noteObj = { title, content };
    formData.append(
      "note",
      new Blob([JSON.stringify(noteObj)], { type: "application/json" })
    );

    // 이미지 파일 있을 때만 첨부
    if (imageUrl) {
      formData.append("image", imageUrl);
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
    formData.append(
      "note",
      new Blob([JSON.stringify(noteObj)], { type: "application/json" })
    );

    if (imageUrl) {
      formData.append("image", imageUrl);
    }

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
