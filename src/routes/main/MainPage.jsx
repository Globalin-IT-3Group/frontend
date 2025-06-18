import { useState, useEffect } from "react";
import MyStudySlider from "../../components/MyStudySlider/MyStudySlider";
import WordSlider from "../../components/WordSlider/WordSlider";
import WordModal from "../../components/WordSlider/WordModal"; // 모달 컴포넌트 import
import { useSelector } from "react-redux";
import StudyRoomApi from "../../api/studyRoomAPI";

export default function MainPage() {
  const [selectedWord, setSelectedWord] = useState(null);
  const user = useSelector((state) => state.auth);

  // API로 참여중인 스터디 가져오기
  const [myStudyRooms, setMyStudyRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 비동기로 스터디방 목록 받아오기
    async function fetchRooms() {
      try {
        const rooms = await StudyRoomApi.getStudyRoomList();
        setMyStudyRooms(rooms);
      } catch (e) {
        // 에러처리 필요시
        setMyStudyRooms([]);
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  const handleCardClick = (word) => {
    setSelectedWord(word);
  };

  const closeModal = () => {
    setSelectedWord(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-800 text-black dark:text-white p-4 md:p-10 transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* 좌측 영역 */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="w-full h-60 aspect-[4/3] max-w-screen-sm mx-auto bg-white dark:bg-zinc-700 shadow rounded-4xl p-5 flex flex-col items-center justify-center">
            <img
              src={
                user.profileImage ||
                "https://dh.aks.ac.kr/Edu/wiki/images/b/b7/%ED%95%91%EA%B5%AC.jpg"
              }
              alt="프로필"
              className="w-20 h-20 rounded-full mb-4"
            />
            <p className="font-bold text-lg">{user.nickname}👋</p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              今日も頑張りましょう！
            </p>
          </div>

          {/* 로딩 중 표시/슬라이더 렌더링 */}
          {loading ? (
            <div className="flex items-center justify-center h-36">
              <span className="text-gray-400">스터디 목록 불러오는 중...</span>
            </div>
          ) : (
            <MyStudySlider myStudyRooms={myStudyRooms} myUserId={user.id} />
          )}

          <div className="w-full aspect-[7/2] bg-white dark:bg-zinc-700 rounded-4xl shadow p-6">
            <p className="font-semibold text-lg">今日のニュース🔥</p>
          </div>
        </div>

        {/* 우측 영역 */}
        <div className="flex flex-col gap-6">
          <WordSlider onCardClick={handleCardClick} />

          <div className="w-full aspect-[7/6] max-w-md mx-auto bg-white dark:bg-zinc-700 rounded-4xl shadow" />
          <div className="w-full aspect-[5/4] max-w-md mx-auto bg-white dark:bg-zinc-700 rounded-4xl shadow" />
        </div>
      </div>

      {selectedWord && <WordModal word={selectedWord} onClose={closeModal} />}
    </div>
  );
}
