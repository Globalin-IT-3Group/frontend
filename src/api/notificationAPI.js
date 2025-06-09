import BaseApi from "./axiosInstance";

class NotificationApi extends BaseApi {
  constructor() {
    super();
  }

  // 알림 전체 조회
  async getAllNotifications() {
    const res = await this.fetcher.get("/notification/");
    return res.data;
  }

  // 특정 알림 삭제
  async deleteNotification(notificationId) {
    await this.fetcher.delete(`/notification/${notificationId}`);
  }
}

export default new NotificationApi();
