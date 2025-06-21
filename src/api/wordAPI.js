import BaseApi from "./axiosInstance";

// entryType, level, examType, page, size를 받아서 백엔드 호출
class WordApi extends BaseApi {
  constructor() {
    super();
  }

  // 단어 목록 가져오기
  async getWords({ entryType, level, examType, page = 0, size = 10 }) {
    const res = await this.fetcher.get("/vocab-grammar", {
      params: { entryType, level, examType, page, size },
    });
    return res.data; // Page 객체 전체 반환 (content, totalPages 등)
  }

  // 예문(example) 수정
  async updateExample(wordId, example) {
    // PUT /vocab-grammar/{id}/example
    const res = await this.fetcher.put(`/vocab-grammar/${wordId}/example`, {
      example,
    });
    return res.data;
  }

  async getRandomVocab9() {
    const res = await this.fetcher.get("/vocab-grammar/random9");
    return res;
  }
}

export default new WordApi();
