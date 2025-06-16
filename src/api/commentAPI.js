import BaseApi from "./axiosInstance";

class CommentApi extends BaseApi {
  constructor() {
    super();
  }

  // 댓글 저장
  async createComment({ userId, boardId, content }) {
    const res = await this.fetcher.post(
      `/comment?userId=${userId}&boardId=${boardId}`,
      content,
      { headers: { "Content-Type": "text/plain" } }
    );
    return res.data;
  }

  // 댓글 수정
  async updateComment({ commentId, userId, content }) {
    const res = await this.fetcher.put(
      `/comment/${commentId}?userId=${userId}`,
      content,
      { headers: { "Content-Type": "text/plain" } }
    );
    return res.data;
  }

  // 댓글 삭제
  async deleteComment({ commentId, userId }) {
    const res = await this.fetcher.delete(
      `/comment/${commentId}?userId=${userId}`
    );
    return res.data;
  }

  // **댓글 목록 조회 추가!!**
  async getCommentsByBoardId(boardId) {
    const res = await this.fetcher.get(`/comment/list?boardId=${boardId}`);
    return res.data;
  }
}

export default new CommentApi();
