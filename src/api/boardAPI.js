import BaseApi from "./axiosInstance";

class BoardApi extends BaseApi {
  constructor() {
    super();
  }

  // 게시글 목록 조회 (페이지네이션, 정렬)
  async getBoards({ page = 0, size = 10, sort = "createdAt,desc" }) {
    const res = await this.fetcher.get("/board", {
      params: { page, size, sort },
    });
    return res.data; // Page<Board>
  }

  // 게시글 상세 조회 (조회수 자동 증가)
  async getBoardDetail(id) {
    const res = await this.fetcher.get(`/board/${id}`);
    return res.data; // Board
  }

  // 게시글 등록
  async createBoard(board) {
    const res = await this.fetcher.post("/board", board);
    return res.data;
  }

  // 게시글 수정
  async updateBoard(id, board) {
    const res = await this.fetcher.put(`/board/${id}`, board);
    return res.data;
  }

  // 게시글 삭제
  async deleteBoard(id) {
    const res = await this.fetcher.delete(`/board/${id}`);
    return res.data;
  }

  // 내가 쓴 게시글 목록 조회
  async getMyBoards({ page = 0, size = 10, sort = "createdAt,desc" }) {
    const res = await this.fetcher.get("/board/my", {
      params: { page, size, sort },
    });
    return res.data; // Page<Board>
  }

  // 최신글 4개만 불러오기
  async getLatestBoards() {
    const res = await this.fetcher.get("/board/latest");
    return res.data;
  }
}

export default new BoardApi();
