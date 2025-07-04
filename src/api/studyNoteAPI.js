import BaseApi from "./axiosInstance";

function base64ToFile(base64Data, fileName) {
  const arr = base64Data.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new File([u8arr], fileName, { type: mime });
}

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

  // 생성
  async createNote({ studyRoomId, title, content, thumbnail }) {
    const formData = new FormData();
    const noteObj = { studyRoomId, title, content };

    // 썸네일 처리
    if (typeof thumbnail === "string") {
      if (thumbnail.startsWith("data:image")) {
        const file = base64ToFile(thumbnail, "study-note.jpg");
        formData.append("image", file);
      } else if (thumbnail.startsWith("http")) {
        noteObj.thumbnail = thumbnail;
      }
    } else if (thumbnail instanceof File) {
      formData.append("image", thumbnail);
    }

    // 항상 마지막에 note 객체 추가
    formData.append(
      "note",
      new Blob([JSON.stringify(noteObj)], { type: "application/json" })
    );

    await this.fetcher.post("/study-note", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  // 수정
  async updateNote(noteId, { title, content, thumbnail }) {
    const formData = new FormData();
    const noteObj = { title, content };

    if (typeof thumbnail === "string") {
      if (thumbnail.startsWith("data:image")) {
        const file = base64ToFile(thumbnail, "study-note.jpg");
        formData.append("image", file);
      } else if (thumbnail.startsWith("http")) {
        noteObj.thumbnail = thumbnail;
      }
    } else if (thumbnail instanceof File) {
      formData.append("image", thumbnail);
    }

    formData.append(
      "note",
      new Blob([JSON.stringify(noteObj)], { type: "application/json" })
    );

    await this.fetcher.put(`/study-note/${noteId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
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
