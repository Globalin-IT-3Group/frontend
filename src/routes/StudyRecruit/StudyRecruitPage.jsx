import RecruitBoxContainer from "../../components/StudyRecruit/RecruitBoxContainer";
import StudyRecruitApi from "../../api/studyRecruitAPI";
import { useState, useEffect, useCallback } from "react";
import StudyRecruitModal from "../../components/StudyRecruit/StudyRecruitModal";
import StudyRecruitBar from "../../components/StudyRecruit/StudyRecruitBar";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function StudyRecruitPage() {
  const [studyRoomList, setStudyRoomList] = useState([]);
  const [showRecruitModal, setShowRecruitModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);

  const [tags, setTags] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (search.trim()) {
      StudyRecruitApi.searchStudyRecruit({ title: search, page }).then(
        (res) => {
          setStudyRoomList(res.content || []);
          setTotalPages(res.totalPages || 1);
        }
      );
    } else {
      StudyRecruitApi.getStudyRecruit({ sortBy, tags, page }).then((res) => {
        setStudyRoomList(res.content || []);
        setTotalPages(res.totalPages || 1);
        console.log(res);
      });
    }
  }, [sortBy, search, page, tags]);

  const handleIncreaseViewCount = useCallback((recruitId) => {
    setStudyRoomList((prev) =>
      prev.map((item) =>
        item.id === recruitId
          ? { ...item, viewCount: item.viewCount + 1 }
          : item
      )
    );
  }, []);

  // 구인글 수정
  const handleUpdateRecruit = async (recruitId, updatedData) => {
    try {
      await StudyRecruitApi.updateRecruit({ recruitId, ...updatedData });
      // 수정 후 다시 목록 리로드
      if (search.trim()) {
        const res = await StudyRecruitApi.searchStudyRecruit({
          title: search,
          page,
        });
        setStudyRoomList(res.content || []);
      } else {
        const res = await StudyRecruitApi.getStudyRecruit({
          sortBy,
          tags,
          page,
        });
        setStudyRoomList(res.content || []);
      }
      setShowRecruitModal(false);
    } catch (err) {
      console.error(err);
      alert("수정에 실패했습니다.");
    }
  };

  const handleCloseModal = () => {
    setShowRecruitModal(false);
    setSelectedModal(null);
  };

  const handleOpenRecruitModal = (study) => {
    // 최신 studyRoomList에서 id로 찾아서 넣기 (props 값 보장)
    const fresh = studyRoomList.find((s) => s.id === study.id) || study;
    setSelectedModal(fresh);
    setShowRecruitModal(true);
  };

  const handleOpenRequestFormModal = () => {
    setShowRecruitModal(false);
  };

  // 페이지 이동 핸들러
  const handlePrevPage = () => setPage((p) => Math.max(0, p - 1));
  const handleNextPage = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mx-auto mt-10 mb-10">스터디 구인</h1>
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
        {studyRoomList.length === 0 ? (
          <div className="text-center text-gray-400 py-24 text-lg">
            현재 모집 중인 스터디가 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 h-full pr-2">
            {studyRoomList.map((study) => (
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
            ))}
          </div>
        )}

        {/* 페이지네이션 */}
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

          <span className="flex items-center px-4 font-semibold">
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
      </div>

      {/* 모달들 (필요에 따라 수정/상세/작성 등) */}
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
          onUpdateRecruit={(updatedData) =>
            handleUpdateRecruit(selectedModal.id, updatedData)
          }
          onIncreaseViewCount={handleIncreaseViewCount}
        />
      )}
    </div>
  );
}
