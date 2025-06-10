import BaseApi from "./axiosInstance";

class UserApi extends BaseApi {
  constructor() {
    super();
  }

  async checkEmail(email) {
    const res = await this.fetcher.get(`/user/check-email`, {
      params: { email },
    });
    return res.data;
  }

  async join(data) {
    const res = await this.fetcher.post("/user/join", data);
    return res.data;
  }

  async login(data) {
    const res = await this.fetcher.post("/user/login", data);
    return res.data;
  }

  async getUserInfo(userId) {
    const res = await this.fetcher.get(`/user/${userId}`);
    return res.data;
  }

  async updateUserInfo(data) {
    const res = await this.fetcher.put("/user", data);
    return res.data;
  }

  async findEmail(data) {
    const res = await this.fetcher.post("/user/find-email", data);
    return res.data;
  }

  async findPassword(data) {
    const res = await this.fetcher.post("/user/find-password", data);
    return res.data;
  }

  async test() {
    const res = await this.fetcher.get("/user/test");
    return res.data;
  }
}

export default new UserApi();
