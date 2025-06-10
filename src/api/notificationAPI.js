import BaseApi from "./axiosInstance";

class NotificationApi extends BaseApi {
  constructor() {
    super();
  }

  // 전체 알림 조회
  async getAllNotifications() {
    const res = await this.fetcher.get("/notification/");
    return res.data;
  }

  // 특정 알림 삭제
  async deleteNotification(notificationId) {
    const res = await this.fetcher.delete(`/notification/${notificationId}`);
    return res.data;
  }

  // 특정 알림 읽음 처리
  async markAsRead(notificationId) {
    const res = await this.fetcher.patch(
      `/notification/${notificationId}/read`
    );
    return res.data;
  }

  // 전체 알림 읽음 처리
  async markAllAsRead() {
    const res = await this.fetcher.patch(`/notification/read-all`);
    return res.data;
  }

  // 읽지 않은 알림 개수 조회
  async getUnreadCount() {
    const res = await this.fetcher.get(`/notification/unread-count`);
    return res.data;
  }
}

export default new NotificationApi();
