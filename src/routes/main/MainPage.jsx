import { useEffect, useState } from "react";
import MyStudySlider from "../../components/MyStudySlider/MyStudySlider";
import WordSlider from "../../components/WordSlider/WordSlider";
import WordModal from "../../components/WordSlider/WordModal";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NewsApi from "../../api/newsAPI";
import WordApi from "../../api/wordAPI";
import noteAPI from "../../api/noteAPI";
import { RiSearch2Line } from "react-icons/ri";
import News from "../../components/main/News";
import MyStudySliderSkeleton from "../../components/skeleton/Main/MyStudySliderSkeleton";
import NewsSkeleton from "../../components/skeleton/Main/NewsSkeleton";
import Skeleton from "react-loading-skeleton";
import WordSliderSkeleton from "../../components/skeleton/Main/WordSliderSkeleton";

export default function MainPage() {
  // context에서 스터디방 정보, 새로고침 함수 받기
  // const { myStudyRooms, refreshStudyRooms, loading } = useOutletContext();
  const { myStudyRooms, refreshStudyRooms } = useOutletContext();
  const [fakeLoading, setFakeLoading] = useState(true);
  const [selectedWord, setSelectedWord] = useState(null);
  const [vocabList, setVocabList] = useState([]);
  const [news, setNews] = useState([]);
  const [myNotes, setMynotes] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFakeLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    NewsApi.getNews().then(setNews);

    // 이게 단어 가져오는 거 (api)
    WordApi.getRandomVocab9().then((result) => {
      setVocabList(result.data);
      console.log(result); // 개발자 도구 켜서 보면 데이터 확인 가능!!
      // 이 result로 데이터를 다뤄볼 것!!
    });
  }, []);

  const handleCardClick = (word) => {
    setSelectedWord(word);
  };

  // ✅ 전체 노트 목록 or 검색 결과 가져오기
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTitle.trim() === "") {
        noteAPI.getNotes().then(setMynotes); // 검색어 없으면 전체 목록
      } else {
        noteAPI.searchMyNotes(searchTitle).then(setMynotes); // 실시간 검색
      }
    }, 300); // debounce 효과 (0.3초 후 요청)

    return () => clearTimeout(delayDebounce);
  }, [searchTitle]);

  const closeModal = () => setSelectedWord(null);

  const handleStudyRoomClick = (studyRoomId) => {
    // 상세 페이지로 이동 (id 넘기기)
    navigate(`/study/mystudyroom/${studyRoomId}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-800 text-black dark:text-white p-4 md:p-10 transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* 좌측 영역 */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="w-full h-60 aspect-[4/3] max-w-screen-sm mx-auto bg-white dark:bg-zinc-700 shadow rounded-4xl p-5 flex flex-col items-center justify-center">
            {fakeLoading ? (
              <div className="w-20 h-20 mb-4">
                <Skeleton circle width="100%" height="100%" />
              </div>
            ) : (
              <img
                src={
                  user.profileImage ||
                  "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg"
                }
                alt="프로필"
                className="w-20 h-20 rounded-full mb-4"
              />
            )}

            <p className="font-bold text-lg">{user.nickname}👋</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              오늘도 파이팅！
            </p>
          </div>

          {/* 로딩 중/슬라이더 */}
          {fakeLoading ? (
            <MyStudySliderSkeleton />
          ) : (
            <MyStudySlider
              myStudyRooms={myStudyRooms}
              myUserId={user.id}
              onRefresh={refreshStudyRooms}
              onStudyRoomClick={handleStudyRoomClick}
            />
          )}

          {fakeLoading ? <NewsSkeleton /> : <News news={news} />}
        </div>

        {/* 우측 영역 */}
        <div className="flex flex-col gap-6">
          {fakeLoading ? (
            <WordSliderSkeleton />
          ) : (
            <>
              <WordSlider words={vocabList} onCardClick={handleCardClick} />
              {selectedWord &&
                Array.isArray(vocabList) &&
                vocabList.length > 0 && (
                  <WordModal
                    words={vocabList}
                    selectedWord={selectedWord}
                    onClose={closeModal}
                  />
                )}
            </>
          )}
          <div className="w-full aspect-[7/6] max-w-md mx-auto bg-white dark:bg-zinc-700 rounded-4xl shadow p-4">
            {/* 🔍 검색창 */}
            <div className="flex items-center mb-4 gap-2">
              <RiSearch2Line className="text-xl text-gray-500 dark:text-gray-300" />
              <input
                type="text"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                placeholder="내 노트 검색"
                className="flex-1 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none text-sm py-1 text-black dark:text-white placeholder-gray-400"
              />
            </div>

            {/* 📘 노트 리스트 */}
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[80%] h-full w-full pr-1">
              {myNotes.length === 0 ? (
                <div className="flex items-center justify-center h-full w-full text-gray-400 dark:text-gray-300 text-sm">
                  노트가 없습니다.
                </div>
              ) : (
                // ✅ 여기부터 전체 노트 리스트
                <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
                  {myNotes.map((note) => (
                    <div
                      key={note.id}
                      className="px-2 py-3 hover:bg-blue-50 dark:hover:bg-zinc-600 cursor-pointer transition"
                      onClick={() => navigate(`/note/${note.id}`)}
                    >
                      <p className="font-semibold text-sm truncate">
                        {note.title}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-300 truncate">
                        {note.content?.replace(/\n/g, " ").slice(0, 15)}.....
                      </p>
                    </div>
                  ))}
                </div>
                // ✅ 여기까지
              )}
            </div>
          </div>
          <div className="w-full aspect-[5/4] max-w-md mx-auto bg-white dark:bg-zinc-700 rounded-4xl shadow" />
        </div>
      </div>
    </div>
  );
}
