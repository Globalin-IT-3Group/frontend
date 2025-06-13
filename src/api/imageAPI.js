import BaseApi from "./axiosInstance";

class ImageAPI extends BaseApi {
  constructor() {
    super();
  }

  async uploadPRofileImage(base64) {
    const res = await this.fetcher.put("/image/profile-image", {
      image: base64,
    });
    return res.data;
  }
}

export default new ImageAPI();
