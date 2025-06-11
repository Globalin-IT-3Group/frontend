import BaseApi from "./axiosInstance";

class UserApi extends BaseApi {
  constructor() {
    super();
  }

  // ✅ 이메일 중복 확인
  async checkEmail(email) {
    const res = await this.fetcher.get("/user/check-email", {
      params: { email },
    });
    return res.data;
  }

  // ✅ 회원가입
  async join(data) {
    const res = await this.fetcher.post("/user/join", data);
    return res.data;
  }

  // ✅ 로그인
  async login(data) {
    const res = await this.fetcher.post("/user/login", data);
    return res.data;
  }

  // ✅ 내 정보 조회
  async getUserInfo(userId) {
    const res = await this.fetcher.get(`/user/${userId}`);
    return res.data;
  }

  // ✅ 닉네임 수정
  async updateNickname(nickname) {
    const res = await this.fetcher.put("/user/nickname", { nickname });
    return res.data;
  }

  // ✅ 비밀번호 수정
  async updatePassword(password) {
    const res = await this.fetcher.put("/user/password", { password });
    return res.data;
  }

  // ✅ 프로필 메시지 수정
  async updateProfileMessage(profileMessage) {
    const res = await this.fetcher.put("/user/profile-message", {
      profileMessage,
    });
    return res.data;
  }

  // ✅ 질문/답변 수정
  async updateQuestionAnswer(question, answer) {
    const res = await this.fetcher.put("/user/question-answer", {
      question,
      answer,
    });
    return res.data;
  }

  // ✅ 이메일 찾기
  async findEmail(data) {
    const res = await this.fetcher.post("/user/find-email", data);
    return res.data;
  }

  // ✅ 비밀번호 찾기
  async findPassword(data) {
    const res = await this.fetcher.post("/user/find-password", data);
    return res.data;
  }
}

export default new UserApi();
