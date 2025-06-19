import BaseApi from "./axiosInstance";

// 더미 유저 데이터
const dummyUsers = [
  {
    id: 1,
    nickname: "홍길동",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    nickname: "이몽룡",
    profileImage: "https://randomuser.me/api/portraits/men/2.jpg",
  },
];

// 더미 문의 데이터 (리스트용)
const dummyInquiries = [
  {
    id: 1,
    user: dummyUsers[0],
    title: "첫 번째 문의입니다.",
    content: "첫 번째 문의 내용입니다. 빠른 답변 부탁드립니다.",
    isPrivate: false,
    adminReply: "확인하였습니다. 곧 답변드리겠습니다.",
    createdAt: "2024-06-17T10:30:00Z",
  },
  {
    id: 2,
    user: dummyUsers[1],
    title: "두 번째 문의입니다.",
    content: "두 번째 문의 내용입니다.",
    isPrivate: true,
    adminReply: null,
    createdAt: "2024-06-18T12:15:00Z",
  },
  {
    id: 3,
    user: dummyUsers[0],
    title: "세 번째 문의",
    content: "세 번째 문의 내용. 비공개입니다.",
    isPrivate: true,
    adminReply: "관리자 답변: 개인정보는 안전하게 처리됩니다.",
    createdAt: "2024-06-18T20:15:00Z",
  },
  {
    id: 4,
    user: dummyUsers[1],
    title: "네 번째 문의",
    content: "네 번째 문의 내용입니다. 추가 문의 사항은 없습니다.",
    isPrivate: false,
    adminReply: null,
    createdAt: "2024-06-19T09:50:00Z",
  },
];

class InquiryApi extends BaseApi {
  constructor() {
    super();
  }

  // 문의 리스트 조회 (페이지네이션)
  async getInquiries({ page = 0, size = 10 } = {}) {
    // 실제 요청이라면:
    // const res = await this.fetcher.get(`/inquiries?page=${page}&size=${size}`);
    // return res.data;

    // 더미데이터 반환
    return Promise.resolve({
      content: dummyInquiries,
      totalPages: 1,
      totalElements: dummyInquiries.length,
      number: page,
      size: size,
      last: true,
      first: true,
    });
  }

  // 내가 쓴 문의 조회 (userId 기준)
  async getMyInquiries(userId, { page = 0, size = 10 } = {}) {
    // 실제 요청이라면:
    // const res = await this.fetcher.get(`/inquiries/my?userId=${userId}&page=${page}&size=${size}`);
    // return res.data;

    // 더미데이터: 해당 userId가 작성한 것만
    const myList = dummyInquiries.filter((inq) => inq.user.id === userId);
    return Promise.resolve({
      content: myList,
      totalPages: 1,
      totalElements: myList.length,
      number: page,
      size: size,
      last: true,
      first: true,
    });
  }
}

export default new InquiryApi();
