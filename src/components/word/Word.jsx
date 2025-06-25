import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdExpandMore } from "react-icons/md";
import WordApi from "../../api/wordAPI";

const isAdmin = true; // 실제 서비스에서는 전역 상태/props로 대체

// "   " 기준으로 줄 분리
function parseExamplesSimple(raw) {
  if (!raw) return [];
  return raw
    .split(/ {3,}/) // 3칸 이상 공백 기준 분리
    .map((str) => str.trim())
    .filter(Boolean);
}

export default function Word({ word }) {
  const [editMode, setEditMode] = useState(false);
  const [exampleValue, setExampleValue] = useState(word.example);
  const [localExample, setLocalExample] = useState(word.example);

  const lines = parseExamplesSimple(editMode ? exampleValue : localExample);

  // 투명 버튼 클릭 → 편집모드
  const handleEditClick = () => {
    setEditMode(true);
    setExampleValue(word.example);
  };

  const handleCancel = () => {
    setEditMode(false);
    setExampleValue(word.example);
  };

  const handleSave = async () => {
    try {
      await WordApi.updateExample(word.id, exampleValue);
      alert("예문이 저장되었습니다.");
      setEditMode(false);
      setLocalExample(exampleValue); // 바로 반영
    } catch (e) {
      console.error(e);
      alert("저장에 실패했습니다.");
    }
  };

  const getEllipsisMessage = (msg) => {
    if (!msg) return "";
    return msg.length > 30 ? msg.slice(0, 30) + "......" : msg;
  };

  return (
    <Accordion className="rounded-2xl mb-2 shadow border-2 border-gray-100">
      <AccordionSummary
        expandIcon={<MdExpandMore size={28} />}
        className="flex flex-wrap gap-4 items-center min-h-16"
      >
        <div className="font-bold text-blue-700 text-lg w-28 min-w-0 truncate">
          {word.jpWord}
        </div>
        <div className="text-gray-600 w-28 min-w-0 truncate">
          {word.hiragana}
        </div>
        <div className="text-gray-400 w-32 min-w-0 truncate">
          {word.altForm}
        </div>
        <div className="flex-1 min-w-0 truncate">
          {getEllipsisMessage(word.meaning)}
        </div>
      </AccordionSummary>
      <AccordionDetails className="bg-gray-50 rounded-b-2xl relative">
        {/* 예문 편집 버튼: 우측 하단, 절대 투명 (관리자만 존재) */}
        {isAdmin && !editMode && (
          <button
            onClick={handleEditClick}
            tabIndex={-1}
            aria-label="예문 편집"
            style={{
              position: "absolute",
              bottom: 10,
              right: 14,
              width: 40,
              height: 40,
              background: "transparent",
              opacity: 0,
              border: "none",
              zIndex: 10,
              cursor: "pointer",
              pointerEvents: "auto",
            }}
          />
        )}

        {/* --- 예문/설명 줄바꿈 출력 --- */}
        <div className="mb-2">
          <span className="font-semibold text-blue-500">예문</span>
          {editMode ? (
            <div className="mt-2 flex flex-col gap-2">
              <textarea
                className="border rounded p-2 w-full min-h-[120px] font-mono text-sm"
                value={exampleValue}
                onChange={(e) => setExampleValue(e.target.value)}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-800"
                >
                  저장
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"
                >
                  취소
                </button>
              </div>
              <div className="text-xs text-gray-500">
                ※ 후리가나는 (ある) 형태로 수동 입력해 주세요.
              </div>
            </div>
          ) : (
            <ul className="list-none ml-0 mt-2">
              {lines.length === 0 ? (
                <li className="text-gray-400"> </li>
              ) : (
                lines.map((line, idx) => (
                  <li key={idx} className="mb-1 text-gray-800">
                    {line}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
        {/* --- 동의어 --- */}
        <div>
          <span className="font-semibold text-pink-500">동의어</span>
          <div className="ml-4 text-gray-700">{word.synonym || ""}</div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
