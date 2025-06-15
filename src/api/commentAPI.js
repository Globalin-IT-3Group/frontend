import BaseApi from "./axiosInstance";

class CommentApi extends BaseApi {
  constructor() {
    super();
  }

  // 댓글 저장
  async createComment({ userId, boardId, content }) {
    // content는 JSON 문자열 or 그냥 문자열로 보낼 수 있음
    const res = await this.fetcher.post(
      `/comment?userId=${userId}&boardId=${boardId}`,
      content, // 그냥 텍스트로 보내면 됨
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
}

export default new CommentApi();
