import { useState, useEffect } from "react";
import WordList from "../../components/word/WordList";
import GrammarList from "../../components/word/GrammarList";
import WordApi from "../../api/wordAPI";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const levels = ["N1", "N2", "N3", "N4", "N5"];
const exams = ["JLPT", "JPT"];
const types = [
  { value: "WORD", label: "단어" },
  { value: "GRAMMAR", label: "문법" },
];

export default function WordPage() {
  const [selectedLevel, setSelectedLevel] = useState("N1");
  const [selectedExam, setSelectedExam] = useState("JLPT");
  const [selectedType, setSelectedType] = useState("WORD");
  const [search, setSearch] = useState("");
  const [words, setWords] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setPage(0);
  }, [selectedType, selectedLevel, selectedExam, search]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const data = await WordApi.getWords({
          entryType: selectedType,
          level: selectedLevel,
          examType: selectedExam,
          page,
          size: 10,
          search,
        });
        setWords(data.content);
        setTotalPages(data.totalPages);
      } catch (e) {
        setWords([]);
        setTotalPages(1);
      }
    };
    fetchWords();
  }, [selectedType, selectedLevel, selectedExam, page, search]);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10">
      <div className="text-4xl font-bold text-center mb-20 select-none text-black dark:text-white">
        📚 단어장
      </div>
      <div className="flex w-full max-w-[1000px] p-2 mr-6">
        {/* 북마크 탭 */}
        <div className="flex flex-col gap-2 mr-8 mt-15">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`
                relative py-1.5 text-md font-bold transition-all
                text-left pl-4 mb-1 cursor-pointer
                ${
                  selectedLevel === level
                    ? "bg-yellow-300 text-yellow-900 shadow-lg"
                    : "bg-white text-gray-600"
                }
                rounded-r-xl
                before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0
                before:w-2 
                ${
                  selectedLevel === level
                    ? "before:bg-yellow-600"
                    : "before:bg-gray-300"
                }
                hover:bg-yellow-100
              `}
              style={{ minWidth: "50px" }}
            >
              {level}
            </button>
          ))}
        </div>

        {/* 오른쪽: 상단 버튼 + 단어/문법 박스 */}
        <div className="flex-1 flex flex-col  max-w-[1000px]">
          {/* 상단 버튼 */}
          <div className="flex gap-2 mb-6 ">
            {exams.map((exam) => (
              <button
                key={exam}
                onClick={() => setSelectedExam(exam)}
                className={`px-4 py-1 rounded-full font-semibold shadow transition cursor-pointer hover:bg-blue-200 hover:scale-105 whitespace-nowrap
                  ${
                    selectedExam === exam
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500 border border-blue-400"
                  }`}
              >
                {exam}
              </button>
            ))}
            {types.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`px-4 py-1 rounded-full font-semibold shadow transition cursor-pointer hover:bg-pink-200 hover:scale-105 whitespace-nowrap
                  ${
                    selectedType === type.value
                      ? "bg-pink-500 text-white"
                      : "bg-white text-pink-500 border border-pink-400"
                  }`}
              >
                {type.label}
              </button>
            ))}
          </div>
          {/* 검색창 */}
          {/* <div className="flex justify-center mb-8">
            <input
              className="w-full max-w-[420px] text-lg px-5 py-3 border-2 border-gray-200 rounded-2xl shadow focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="단어, 뜻, 예문 등을 입력하세요"
            />
          </div> */}
          {/* 필터 정보 */}
          <div className="w-full">
            <div className="flex flex-wrap justify-center gap-4 items-center text-lg mb-8 text-center">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                {selectedExam}
              </span>
              <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded">
                {selectedType === "WORD" ? "단어" : "문법"}
              </span>
              <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded">
                {selectedLevel}
              </span>
            </div>
            {/* 단어 or 문법 리스트 */}
            <div className="mt-4">
              {words.length === 0 ? (
                <div className="text-gray-400 py-10 text-center">
                  단어가 없습니다.
                </div>
              ) : (
                <div className="flex flex-col">
                  {selectedType === "WORD" ? (
                    <WordList words={words} />
                  ) : (
                    <GrammarList grammars={words} />
                  )}
                </div>
              )}
            </div>
            {/* 페이지네이션 */}
            <div className="flex justify-center gap-2 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className={`
                flex items-center justify-center w-10 h-10 rounded-full cursor-pointer
                ${
                  page === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                }
              `}
                aria-label="이전"
              >
                <MdChevronLeft size={24} />
              </button>
              <span className="flex items-center px-4 font-semibold text-gray-700 dark:text-white">
                {page + 1} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page + 1 >= totalPages}
                className={`
                flex items-center justify-center w-10 h-10 rounded-full cursor-pointer
                ${
                  page + 1 >= totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                }
              `}
                aria-label="다음"
              >
                <MdChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
