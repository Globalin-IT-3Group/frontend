import Word from "./Word";

export default function WordList({ words }) {
  // 헤더 라벨
  const header = [
    { label: "일본어", className: "flex-1 min-w-0" },
    { label: "히라가나", className: "flex-1 min-w-0" },
    { label: "다른 표기", className: "w-32 flex-shrink-0 hidden lg:flex" },
    { label: "뜻", className: "flex-1 min-w-0" },
  ];

  return (
    <div className="mx-auto w-[285px] sm:w-full">
      {/* 헤더 */}
      <div className="flex items-center px-3 py-2 bg-gray-100 dark:bg-zinc-600 dark:text-white rounded-t-2xl font-semibold text-gray-600">
        {header.map((h, i) => (
          <div key={i} className={`${h.className} px-2 truncate text-center`}>
            {h.label}
          </div>
        ))}
      </div>
      {/* Word 리스트 */}
      {words.map((word) => (
        <Word key={word.id} word={word} />
      ))}
    </div>
  );
}
