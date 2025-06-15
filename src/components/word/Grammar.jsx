import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { MdExpandMore } from "react-icons/md";

function parseExamples(exampleRaw) {
  if (!exampleRaw) return [];
  const parts = exampleRaw
    .split(/ {3,}|\t|\n/) // 3칸 이상 공백 or 탭/줄바꿈
    .map((str) => str.trim())
    .filter(Boolean);

  const pairs = [];
  for (let i = 0; i < parts.length; i += 2) {
    pairs.push({
      jp: parts[i],
      kr: parts[i + 1] || "",
    });
  }
  return pairs;
}

export default function Grammar({ grammar }) {
  const examplePairs = parseExamples(grammar.example);

  return (
    <Accordion className="rounded-2xl mb-2 shadow border-2 border-gray-100">
      <AccordionSummary
        expandIcon={<MdExpandMore size={28} />}
        className="flex gap-6 items-center min-h-16"
      >
        <div className="font-bold text-blue-700 text-lg w-44 min-w-0 truncate">
          {grammar.jpWord}
        </div>
        <div className="flex-1 min-w-0 truncate">{grammar.meaning}</div>
      </AccordionSummary>
      <AccordionDetails className="bg-gray-50 rounded-b-2xl">
        <span className="font-semibold text-blue-500">예문</span>
        <div className="ml-2 mt-2 text-gray-800 text-base">
          {examplePairs.length === 0 ? (
            <span className="text-gray-400"> </span>
          ) : (
            examplePairs.map((ex, i) => (
              <div key={i} className="mb-4">
                <div>{ex.jp}</div>
                <div>{ex.kr}</div>
              </div>
            ))
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
