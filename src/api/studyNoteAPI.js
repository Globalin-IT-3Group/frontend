import BaseApi from "./axiosInstance";

class StudyNoteApi extends BaseApi {
  // 1. 스터디방 노트 목록 조회
  async getNotesByRoom(roomId, { page = 0, size = 10, sort } = {}) {
    const params = { page, size };
    if (sort) params.sort = sort;
    const res = await this.fetcher.get(`/study-note/rooms/${roomId}`, {
      params,
    });
    return res.data;
  }

  // 2. 노트 상세 조회
  async getNoteDetail(noteId) {
    const res = await this.fetcher.get(`/study-note/${noteId}`);
    return res.data;
  }

  // 3. 노트 생성
  async createNote(data) {
    await this.fetcher.post("/study-note", data);
  }

  // 4. 노트 수정
  async updateNote(noteId, data) {
    await this.fetcher.put(`/study-note/${noteId}`, data);
  }

  // 5. 노트 삭제
  async deleteNote(noteId) {
    await this.fetcher.delete(`/study-note/${noteId}`);
  }

  // 6. 좋아요 추가
  async likeNote(noteId) {
    await this.fetcher.post(`/study-note/${noteId}/hearts`);
  }

  // 7. 좋아요 취소
  async unlikeNote(noteId) {
    await this.fetcher.delete(`/study-note/${noteId}/hearts`);
  }

  // 8. 댓글 목록 조회
  async getComments(noteId) {
    const res = await this.fetcher.get(`/study-note/${noteId}/comments`);
    return res.data;
  }

  // 9. 댓글 작성
  async createComment(noteId, data) {
    await this.fetcher.post(`/study-note/${noteId}/comments`, data);
  }

  // 10. 댓글 수정
  async updateComment(commentId, data) {
    await this.fetcher.put(`/study-note/comments/${commentId}`, data);
  }

  // 11. 댓글 삭제
  async deleteComment(commentId) {
    await this.fetcher.delete(`/study-note/comments/${commentId}`);
  }
}

// 싱글턴 인스턴스 export (보통 이렇게 사용)
export default new StudyNoteApi();
