import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { MdExpandMore } from "react-icons/md";

export default function Alarm({ alarm, onRead }) {
  const isUnread = alarm.read === false;

  return (
    <Accordion
      className="rounded-2xl mb-2 shadow border-2 border-gray-100"
      onChange={(_, expanded) => {
        if (expanded && isUnread) {
          onRead?.(alarm.id);
        }
      }}
    >
      <AccordionSummary
        expandIcon={<MdExpandMore size={28} />}
        className="flex flex-wrap items-center min-h-16"
      >
        <div className="flex items-center flex-1 gap-2">
          {isUnread && (
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 mb-4" />
          )}
          <span className="font-semibold">{alarm.content}</span>
        </div>
        <span className="text-xs text-gray-400 ml-4">
          {new Date(alarm.createdAt).toLocaleString()}
        </span>
      </AccordionSummary>
      <AccordionDetails className="bg-gray-50 rounded-b-2xl">
        {alarm.type === "FRIEND" && alarm.sender && (
          <div className="flex items-center gap-2">
            <b>{alarm.sender.nickname}</b>님이 친구 요청을 보냈습니다!
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
