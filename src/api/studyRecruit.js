import BaseApi from "./axiosInstance";

class StudyRecruitAPI extends BaseApi {
  constructor() {
    super();
  }

  async getStudyRecruitByCategory(params) {
    const { category, tag } = params;
    // const res = await this.fetcher.get(`/study-recruit?category=${params.category}&tag=${params.tag}`);
    // return res.data;

    //클릭시 모달 나오면서(배경 명암 처리)
    //신청, 닫기 버튼 => 신청 버튼 클릭시 신청 폼 모달로 이동(이전 모달 닫는 로직 필요)
    //

    return Promise.resolve([
      {
        id: 1,
        studyRoomId: 3,
        title: "일본어 공부할 사람 구해요!",
        studyExplain: `PRINT:F(프린트F) 스터디에서 CS 스터디 같이 할 분을 찾습니다



PRINT:F(프린트F)

"CS 개념은 외웠는데, 왜 나는 계속 면접이 어려울까?”라는 생각에서 시작하게된 스터디입니다, 저희 스터디는 기초 CS 이론 학습 + 면접 훈련을 함께 하는 "소리 없는 개발자"들을 위한 실력 키우기 스터디입니다.



이런 분에게 추천해요

코딩은 공부했지만 말로 정리하거나 말하는 게 어려운 분

포트폴리오/면접/자기소개서에서 뭘 말해야 하지 모르는 분

비전공자로 커리어 전환 중, 실력과 자기소개 모두 키우고 싶은 분

토이프로젝트도 잘 해놓고 정리/표현이 약한 분

조용히 성장하고 싶은 예비 개발자, 신입 준비생



스터디 구성

1회차 : OT / 자기소개 + 간단 커리큘럼 소개 및 일정 안내

2~6회차 : 각 주차 CS 핵심 주제 + 자기표현 과제 세트

7회차: 기술 면접 시뮬레이션

각 커리큘럼 별 순서나 내용은 인원별로 상이할 수 있습니다



모집부문

- 모집기간 : 06.09(월) ~ 06.22(일)

* 모집인원 종결 시 조기 마감 예정

- 모집인원 : 8 ~ 10명

- 모임기간 : 07월 ~ 10월

- 모임주기 : 격주 1회, 조별 투표로 날짜 지정 후 진행

- 모임장소 : 온라인(ZOOM) + 오프라인(대면)

`,
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
