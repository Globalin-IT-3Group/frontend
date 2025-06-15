import Word from "./Word";

export default function WordList({ words }) {
  // 헤더 라벨
  const header = [
    { label: "일본어", className: "w-28" },
    { label: "히라가나", className: "w-28" },
    { label: "다른 표기", className: "w-32" },
    { label: "뜻", className: "flex-1" },
  ];

  return (
    <div>
      {/* 헤더 */}
      <div className="hidden md:flex items-center px-3 py-2 bg-gray-100 rounded-t-2xl font-semibold text-gray-600">
        {header.map((h, i) => (
          <div key={i} className={`${h.className} truncate`}>
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
