import { HashtagIcon } from "@heroicons/react/24/outline";
import { LuClock } from "react-icons/lu";
import { HiTrendingUp } from "react-icons/hi";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { LuMailCheck } from "react-icons/lu";

export default function StudydRecruitBar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showHashtag, setShowHashtag] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const hashtags = [
    "#JLPT",
    "#회화",
    "#취업",
    "#자격증",
    "#토익",
    "#스터디",
    "#비즈니스일본어",
  ];

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="bg-white w-full h-auto p-8 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between">
        {/* 왼쪽 필터 메뉴 */}
        <div className="flex space-x-8 ml-4">
          {[
            { label: "New", icon: LuClock },
            { label: "Most View", icon: HiTrendingUp },
            { label: "My Request", icon: LuMailCheck },
          ].map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="relative group flex items-center gap-x-2 text-gray-500 hover:text-black cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
            >
              <Icon className="w-5 h-5" />
              <span className="text-md relative whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[2px] after:bg-[#003CFF] after:transition-all after:duration-300 group-hover:after:left-0 group-hover:after:w-full">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* 오른쪽 검색 + 해시태그 */}
        <div className="flex items-center justify-end gap-4 w-full max-w-3xl relative">
          {/* 검색창 */}
          <input
            type="text"
            placeholder="스터디 그룹명을 검색하세요"
            className={`h-[50px] rounded-2xl border border-gray-300 shadow pl-4 pr-4 bg-white transition-all duration-300 ease-in-out ${
              showSearch
                ? "w-[300px] opacity-100"
                : "w-0 opacity-0 overflow-hidden"
            }`}
          />

          {/* 검색 아이콘 */}
          <MagnifyingGlassIcon
            className="w-6 h-6 text-gray-500 hover:text-black cursor-pointer transition-all duration-300"
            onClick={() => {
              setShowSearch((prev) => !prev);
              setShowHashtag(false);
            }}
          />

          <div className="relative">
            <HashtagIcon
              className="w-6 h-6 text-gray-500 hover:text-black cursor-pointer transition-all duration-300"
              onClick={() => {
                setShowHashtag((prev) => !prev);
                setShowSearch(false);
              }}
            />

            <div
              className={`
                fixed top-[250px] right-[100px] bg-white border border-gray-300 rounded-2xl shadow p-4 z-50
                transition-all duration-300 ease-in-out transform origin-right
                ${
                  showHashtag
                    ? "scale-x-100 opacity-100 visible"
                    : "scale-x-0 opacity-0 invisible"
                }
              `}
            >
              <div className="inline-block whitespace-nowrap">
                {hashtags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 mr-2 mb-2 rounded-full transition border ${
                        isSelected
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
              {selectedTags.length > 0 && (
                <div className="text-gray-500 pt-2 text-sm">
                  선택됨: {selectedTags.join(", ")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
