import { useState, useEffect, useCallback } from "react";
import RecruitBoxContainer from "../../components/StudyRecruit/RecruitBoxContainer";
import StudyRecruitApi from "../../api/studyRecruitAPI";
import StudyRecruitModal from "../../components/StudyRecruit/StudyRecruitModal";
import StudyRecruitBar from "../../components/StudyRecruit/StudyRecruitBar";
import StudyRequestFormModal from "../../components/StudyRecruit/StudyRequestFormModal";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import StudyRecruitBarSkeleton from "../../components/skeleton/StudyRecruit/StudyRecruitBarSkeleton";
import RecruitBoxContainerSkeleton from "../../components/skeleton/StudyRecruit/RecruitBoxContainerSkeleton";

export default function StudyRecruitPage() {
  const [studyRoomList, setStudyRoomList] = useState([]);
  const [showRecruitModal, setShowRecruitModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);

  // 신청서 모달 상태
  const [showRequestFormModal, setShowRequestFormModal] = useState(false);
  const [requestRoomName, setRequestRoomName] = useState("");

  // 필터/페이지 상태
  const [tags, setTags] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // 스켈레톤(로딩) 상태
  const [loading, setLoading] = useState(false);

  // 데이터 불러오기
  useEffect(() => {
    setLoading(true);
    const fetchList = search.trim()
      ? StudyRecruitApi.searchStudyRecruit({ title: search, page })
      : StudyRecruitApi.getStudyRecruit({ sortBy, tags, page });
    fetchList.then((res) => {
      setStudyRoomList(res.content || []);
      setTotalPages(res.totalPages || 1);
      setLoading(false);
    });
  }, [sortBy, search, page, tags]);

  // 상세조회 클릭 시 viewCount 동기화
  const handleIncreaseViewCount = useCallback((recruitId) => {
    setStudyRoomList((prev) =>
      prev.map((item) =>
        item.id === recruitId
          ? { ...item, viewCount: item.viewCount + 1 }
          : item
      )
    );
  }, []);

  // 상세 모달 열기
  const handleOpenRecruitModal = (study) => {
    const fresh = studyRoomList.find((s) => s.id === study.id) || study;
    setSelectedModal(fresh);
    setShowRecruitModal(true);
  };

  // 상세 모달 닫기
  const handleCloseModal = () => {
    setShowRecruitModal(false);
    setSelectedModal(null);
  };

  // 신청서 모달 열기
  const handleOpenRequestFormModal = () => {
    setShowRecruitModal(false);
    setRequestRoomName(selectedModal?.title || "");
    setShowRequestFormModal(true);
  };

  // 신청서 모달 닫기
  const handleCloseRequestFormModal = () => {
    setShowRequestFormModal(false);
    setRequestRoomName("");
  };

  // 페이지 이동
  const handlePrevPage = () => setPage((p) => Math.max(0, p - 1));
  const handleNextPage = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mx-auto mt-10 mb-10 dark:text-white">
        스터디 구인
      </h1>
      <StudyRecruitBar
        sortBy={sortBy}
        onChangeSort={(key) => {
          setSortBy(key);
          setPage(0);
        }}
        search={search}
        onChangeSearch={(v) => {
          setSearch(v);
          setPage(0);
        }}
        tags={tags}
        onChangeTags={(newTags) => {
          setTags(newTags);
          setPage(0);
        }}
      />

      <div className="relative h-full w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 h-full pr-2">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <RecruitBoxContainerSkeleton key={i} />
            ))
          ) : studyRoomList.length === 0 ? (
            <div className="text-center text-gray-400 py-24 text-lg col-span-3">
              현재 모집 중인 스터디가 없습니다.
            </div>
          ) : (
            studyRoomList.map((study) => (
              <RecruitBoxContainer
                key={study.id}
                image={study.imageUrl || "/6.jpg"}
                roomName={study.title}
                studyExplain={study.studyExplain}
                profileImage={study.leader.profileImage}
                leader={study.leader.nickname}
                createdAt={study.createdAt}
                userCount={`${study.currentMemberCount}/${study.maxUserCount} 모집`}
                viewCount={study.viewCount}
                tags={study.tags}
                onClick={() => handleOpenRecruitModal(study)}
              />
            ))
          )}
        </div>

        {/* 페이지네이션 */}
        {!loading && (
          <div className="flex justify-center gap-2 mt-8 mb-6">
            <button
              onClick={handlePrevPage}
              disabled={page === 0}
              className={`w-10 h-10 flex items-center justify-center rounded-full
                ${
                  page === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                }`}
              aria-label="이전"
            >
              <MdChevronLeft size={24} />
            </button>

            <span className="flex items-center px-4 font-semibold dark:text-white">
              {page + 1}/{totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={page + 1 >= totalPages}
              className={`w-10 h-10 flex items-center justify-center rounded-full
                ${
                  page + 1 >= totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                }`}
              aria-label="다음"
            >
              <MdChevronRight size={24} />
            </button>
          </div>
        )}
      </div>

      {/* 상세 모달 */}
      {showRecruitModal && selectedModal && (
        <StudyRecruitModal
          image={selectedModal.imageUrl || "/6.jpg"}
          roomName={selectedModal.title}
          studyExplain={selectedModal.studyExplain}
          profileImage={selectedModal.leader.profileImage}
          leader={selectedModal.leader.nickname}
          createdAt={selectedModal.createdAt}
          userCount={`${selectedModal.currentMemberCount}/${selectedModal.maxUserCount} 모집`}
          recruitId={selectedModal.id}
          viewCount={selectedModal.viewCount}
          tags={selectedModal.tags}
          onClose={handleCloseModal}
          onRequestFormOpen={handleOpenRequestFormModal}
          onIncreaseViewCount={handleIncreaseViewCount}
        />
      )}

      {/* 신청서 모달 */}
      {showRequestFormModal && (
        <StudyRequestFormModal
          roomName={requestRoomName}
          onClose={handleCloseRequestFormModal}
        />
      )}
    </div>
  );
}
