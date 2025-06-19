import BaseApi from "./axiosInstance";

class NewsApi extends BaseApi {
  constructor() {
    super();
  }

  async getNews() {
    const res = await this.fetcher.get("/news");
    return res.data;
  }
}

export default new NewsApi();
