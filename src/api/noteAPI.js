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
  async createNote(data) {
    const res = await this.fetcher.post("/note/", data);
    return res.data;
  }

  // 노트 수정
  async updateNote(noteId, data) {
    const res = await this.fetcher.put(`/note/${noteId}`, data);
    return res.data;
  }

  // 노트 삭제
  async deleteNote(noteId) {
    const res = await this.fetcher.delete(`/note/${noteId}`);
    return res.data;
  }
}

export default new NoteApi();
