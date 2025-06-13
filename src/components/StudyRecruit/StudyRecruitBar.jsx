import { HashtagIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { LuClock } from "react-icons/lu";
import { HiTrendingUp } from "react-icons/hi";
import { LuMailCheck } from "react-icons/lu";
import { useState, useEffect, useRef } from "react";

export default function StudydRecruitBar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showHashtag, setShowHashtag] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [activeFilter, setActiveFilter] = useState("New");

  const hashtags = [
    "#JLPT",
    "#회화",
    "#취업",
    "#자격증",
    "#토익",
    "#스터디",
    "#비즈니스일본어",
  ];

  const searchBoxRef = useRef(null);
  const hashtagRef = useRef(null);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (hashtagRef.current && !hashtagRef.current.contains(e.target)) {
        setShowHashtag(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white w-full h-auto p-8 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex space-x-8 ml-4">
          {["New", "Most View", "My Request"].map((label) => {
            const isActive = activeFilter === label;
            return (
              <div
                key={label}
                onClick={() => setActiveFilter(label)}
                className={`relative group flex items-center gap-x-2 cursor-pointer transition-all duration-300 transform ${
                  isActive
                    ? "text-black -translate-y-1"
                    : "text-gray-500 hover:text-black hover:-translate-y-1"
                }`}
              >
                {label === "New" && <LuClock className="w-5 h-5" />}
                {label === "Most View" && <HiTrendingUp className="w-5 h-5" />}
                {label === "My Request" && <LuMailCheck className="w-5 h-5" />}

                <span
                  className={`text-md relative whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#003CFF] after:transition-all after:duration-300 ${
                    isActive
                      ? "after:left-0 after:w-full"
                      : "group-hover:after:left-0 group-hover:after:w-full after:w-0"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        <div
          ref={searchBoxRef}
          className="flex items-center justify-end gap-4 w-full max-w-3xl relative"
        >
          <input
            type="text"
            placeholder="스터디 그룹명을 검색하세요"
            className={`h-[50px] rounded-2xl border border-gray-300 shadow pl-4 pr-4 bg-white transition-all duration-300 ease-in-out ${
              showSearch
                ? "w-[300px] opacity-100"
                : "w-0 opacity-0 overflow-hidden"
            }`}
          />

          <MagnifyingGlassIcon
            className="w-6 h-6 text-gray-500 hover:text-black cursor-pointer transition-all duration-300"
            onClick={() => {
              setShowSearch((prev) => !prev);
              setShowHashtag(false);
            }}
          />

          <div className="relative" ref={hashtagRef}>
            <HashtagIcon
              className="w-6 h-6 mr-4 text-gray-500 hover:text-black cursor-pointer transition-all duration-300"
              onClick={() => {
                setShowHashtag((prev) => !prev);
                setShowSearch(false);
              }}
            />

            <div
              className={`absolute top-1/2 right-full -translate-y-1/2 mr-2
                bg-white border border-gray-300 rounded-2xl shadow p-4 z-50
                transition-all duration-300 ease-in-out transform origin-right
                ${
                  showHashtag
                    ? "scale-x-100 opacity-100 visible"
                    : "scale-x-0 opacity-0 invisible"
                }`}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
