import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { MdExpandMore } from "react-icons/md";

export default function Alarm({ alarm, onRead, onDelete }) {
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
        className="flex items-center min-h-16 overflow-hidden"
      >
        <div className="flex items-center gap-2 flex-1 min-w-0 overflow-hidden">
          {isUnread && (
            <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
          )}
          <div className="truncate whitespace-nowrap overflow-hidden min-w-0">
            <span className="font-semibold">{alarm.content.split(":")[0]}</span>
          </div>
        </div>
        <span className="text-xs text-gray-400 ml-4 whitespace-nowrap">
          <span className="block sm:hidden">
            {new Date(alarm.createdAt).toLocaleDateString("ko-KR")}
          </span>
          <span className="hidden sm:block">
            {new Date(alarm.createdAt).toLocaleString("ko-KR")}
          </span>
        </span>
      </AccordionSummary>
      <AccordionDetails className="bg-gray-50 rounded-b-2xl">
        <div className="flex justify-between items-end w-full">
          <div>
            {alarm.type === "FRIEND" && alarm.sender && (
              <div className="flex items-center gap-2">
                <b>{alarm.sender.nickname}</b>님이 친구 요청을 보냈습니다!
              </div>
            )}
            {alarm.type === "STUDY" && (
              <div className="flex items-center gap-2">
                <b>{alarm.sender.nickname}</b> | {alarm.content}
              </div>
            )}
            {alarm.type === "SYSTEM" && (
              <div className="flex items-center gap-2">
                {alarm.content.split(":")[1]}
              </div>
            )}
            {alarm.type === "CHAT" && alarm.sender && (
              <div className="flex items-center gap-2">
                <b>{alarm.sender.nickname}</b>님이 보낸 채팅 알림: <br />
                {alarm.content}
              </div>
            )}
          </div>
          {/* 삭제 버튼 */}
          <button
            onClick={() => onDelete?.(alarm.id)}
            className="bg-red-500 text-white text-xs px-2 py-1 rounded shadow hover:bg-red-600 transition-all ml-6"
          >
            삭제
          </button>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
