import BaseApi from "./axiosInstance";

class StudyRecruitAPI extends BaseApi {
  constructor() {
    super();
  }

  async getStudyRecruitByCategory(params) {
    const { category, tag } = params;
    // const res = await this.fetcher.get(`/study-recruit?category=${params.category}&tag=${params.tag}`);
    // return res.data;

    return Promise.resolve([
      {
        id: 1,
        studyRoomId: 3,
        title: "일본어 공부할 사람 구해요!",
        studyExplain:
          "회사원분들만 모집하고 있습니다! 현재, 저희 스터디는요 이러이러 하구요 이래이래 저래저래 얄라얄라 현재, 저희 스터디는요 이러이러 하구요 이래이래 저래저래 얄라얄라",
        userCount: 2,
        viewCount: 0,
        isOpen: true,
        createdAt: "2025-06-12T12:10:00Z",
        leader: {
          id: 1,
          nickname: "테스트1",
          profileImage: "https://randomuser.me/api/portraits/men/10.jpg",
          profileMessage: "내가 리더다",
        },
      },
      {
        id: 2,
        studyRoomId: 4,
        title: "일본 취뽀하고 싶은 사람 모여라!",
        studyExplain:
          "회사원분들만 모집하고 있습니다! 현재, 저희 스터디는요 이러이러 하구요 이래이래 저래저래 얄라얄라 현재, 저희 스터디는요 이러이러 하구요 이래이래 저래저래 얄라얄라",
        userCount: 3,
        viewCount: 1,
        isOpen: true,
        createdAt: "2025-06-12T13:10:00Z",
        leader: {
          id: 2,
          nickname: "테스트2",
          profileImage: "https://randomuser.me/api/portraits/men/21.jpg",
          profileMessage: "안녕 방가방가가",
        },
      },
      {
        id: 3,
        studyRoomId: 8,
        title: "회화 위주 스터디임다다",
        studyExplain:
          "현재, 저희 스터디는요 이러이러 하구요 이래이래 저래저래 얄라얄라 현재, 저희 스터디는요 이러이러 하구요 이래이래 저래저래 얄라얄라현재, 저희 스터디는요 이러이러 하구요 이래이래 저래저래 얄라얄라 ",
        userCount: 1,
        viewCount: 0,
        isOpen: true,
        createdAt: "2025-06-12T14:10:00Z",
        leader: {
          id: 3,
          nickname: "테스트3",
          profileImage: "https://randomuser.me/api/portraits/men/20.jpg",
          profileMessage: "헬로~",
        },
      },
      {
        id: 4,
        studyRoomId: 9,
        title: "드루와와",
        studyExplain:
          "현재, 저희 스터디는요 이러이러 하구요 이래이래 저래저래 얄라얄라 현재, 저희 스터디는요 이러이러 하구요 이래이래 저래저래 얄라얄라현재, 저희 스터디는요 이러이러 하구요 이래이래 저래저래 얄라얄라",
        userCount: 3,
        viewCount: 0,
        isOpen: true,
        createdAt: "2025-06-12T15:10:00Z",
        leader: {
          id: 4,
          nickname: "테스트4",
          profileImage: "https://randomuser.me/api/portraits/men/14.jpg",
          profileMessage: "왓썹?",
        },
      },
    ]);
  }
}

export default StudyRecruitAPI;
