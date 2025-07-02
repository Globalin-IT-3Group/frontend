import BaseApi from "./axiosInstance";

class ImageAPI extends BaseApi {
  constructor() {
    super();
  }

  async uploadProfileImage(file) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await this.fetcher.post("/image/profile-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  }
}

export default new ImageAPI();
