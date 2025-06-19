import BaseApi from "./axiosInstance";

class InquiryApi extends BaseApi {
  constructor() {
    super();
  }

  async getInquiries({ page = 0, size = 10 } = {}) {
    const result = await this.fetcher.get(
      `/inquiries?page=${page}&size=${size}&sort=createdAt,desc`
    );
    return result.data;
  }

  async getMyInquiries({ page = 0, size = 10 } = {}) {
    const result = await this.fetcher.get(
      `/inquiries/my?page=${page}$size=${size}`
    );
    return result.data;
  }

  async createInquiry({ title, content, isPrivate }) {
    await this.fetcher.post(`/inquiries`, {
      title,
      content,
      isPrivate,
    });
  }

  async replyToInquiry({ inquiryId, replyText }) {
    return await this.fetcher.post(`/inquiries/${inquiryId}/reply`, {
      reply: replyText,
    });
  }
}

export default new InquiryApi();
