import { MagnifyingGlassIcon, HashtagIcon } from "@heroicons/react/24/outline";
import { HiTrendingUp } from "react-icons/hi";
import { useRef, useEffect, useState } from "react";
import { BsBookmarkStarFill } from "react-icons/bs";
import { BiListPlus } from "react-icons/bi";

export default function StudyRecruitBar({
  sortBy,
  onChangeSort,
  search,
  onChangeSearch,
  tags,
  onChangeTags,
}) {
  const hashtags = [
    { label: "#JLPT", value: "JLPT" },
    { label: "#스터디", value: "스터디" },
    { label: "#회화", value: "회화" },
    { label: "#취업", value: "취업" },
    { label: "#자격증", value: "자격증" },
    { label: "#토익", value: "토익" },
    { label: "#비즈니스일본어", value: "비즈니스일본어" },
  ];

  const toggleTag = (tagValue) => {
    if (tags.includes(tagValue)) {
      onChangeTags(tags.filter((t) => t !== tagValue));
    } else {
      onChangeTags([...tags, tagValue]);
    }
  };

  const [showSearch, setShowSearch] = useState(false);
  const [showHashtag, setShowHashtag] = useState(false);
  const searchBoxRef = useRef(null);
  const hashtagRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target))
        setShowSearch(false);
      if (hashtagRef.current && !hashtagRef.current.contains(e.target))
        setShowHashtag(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white w-full h-auto p-8 flex flex-col overflow-hidden dark:bg-zinc-800">
      <div className="flex items-center justify-between">
        {/* 정렬 탭 */}
        <div className="flex space-x-8 ml-4">
          {[
            {
              key: "latest",
              label: "New",
              icon: <BiListPlus className="w-6 h-6 dark:text-white" />,
            },
            {
              key: "mostView",
              label: "Most View",
              icon: <HiTrendingUp className="w-5 h-5 dark:text-white" />,
            },
            {
              key: "myRequest",
              label: "My Request",
              icon: <BsBookmarkStarFill className="w-5 h-5 dark:text-white" />,
            },
          ].map(({ key, label, icon }) => {
            const isActive = sortBy === key;
            return (
              <div
                key={key}
                onClick={() => onChangeSort(key)}
                className={`relative group flex items-center gap-x-2 cursor-pointer transition-all duration-300 transform ${
                  isActive
                    ? "text-black dark:text-white -translate-y-1"
                    : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:-translate-y-1"
                }`}
              >
                {icon}
                <span
                  className={`text-md relative whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#003CFF] after:transition-all after:duration-300 ${
                    isActive
                      ? "after:left-0 after:w-full"
                      : "group-hover:after:left-0 group-hover:after:w-full after:w-0"
                  }
                  hidden md:inline
                  `}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
        {/* 검색/태그 */}
        <div className="h-[50px] flex items-center justify-end gap-4 w-full max-w-3xl">
          {/* 검색창 */}
          {sortBy !== "myRequest" && (
            <div ref={searchBoxRef} className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => onChangeSearch(e.target.value)}
                placeholder="스터디 그룹명을 검색하세요"
                className={`h-[50px] rounded-2xl border border-gray-300 shadow pl-4 pr-4 bg-white transition-all duration-300 ease-in-out ${
                  showSearch
                    ? "w-[300px] opacity-100"
                    : "w-0 opacity-0 overflow-hidden"
                }`}
              />
              <MagnifyingGlassIcon
                className="w-6 h-6 text-gray-500 dark:text-gray-400 dark:hover:text-white hover:text-black cursor-pointer transition-all duration-300 absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => {
                  setShowSearch((prev) => !prev);
                  setShowHashtag(false);
                }}
              />
            </div>
          )}
          {/* 태그 */}
          <div className="relative" ref={hashtagRef}>
            <HashtagIcon
              className="w-6 h-6 mr-4 text-gray-500 dark:text-gray-400 dark:hover:text-white hover:text-black cursor-pointer transition-all duration-300"
              onClick={() => {
                setShowHashtag((prev) => !prev);
                setShowSearch(false);
              }}
            />
            <div
              className={`absolute top-1/2 right-full -translate-y-1/2 mr-2
                bg-white border border-gray-300 rounded-2xl shadow p-4 z-50
                transition-all duration-300 ease-in-out transform origin-right dark:text-white
                ${
                  showHashtag
                    ? "scale-x-100 opacity-100 visible"
                    : "scale-x-0 opacity-0 invisible"
                }`}
            >
              <div className="inline-block whitespace-nowrap">
                {hashtags.map((tag) => {
                  const isSelected = tags.includes(tag.value);
                  return (
                    <button
                      key={tag.value}
                      onClick={() => toggleTag(tag.value)}
                      className={`px-3 py-1 mr-2 mb-2 rounded-full transition border ${
                        isSelected
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300"
                      }`}
                    >
                      {tag.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
