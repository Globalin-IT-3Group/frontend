import BaseApi from "./axiosInstance";

class NotificationApi extends BaseApi {
  constructor() {
    super();
  }

  // 페이지네이션 기반 전체 알림 조회
  async getNotificationsPage({
    page = 0,
    size = 10,
    sort = "createdAt,desc",
  } = {}) {
    const res = await this.fetcher.get(
      `/notification/page?page=${page}&size=${size}&sort=${sort}`
    );
    return res.data; // content, totalPages, totalElements 등 포함!
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
