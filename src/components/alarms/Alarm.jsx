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
        className="flex items-center min-h-16 overflow-hidden"
      >
        <div className="flex items-center gap-2 flex-1 min-w-0 overflow-hidden">
          {isUnread && (
            <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
          )}

          {/* 💡 텍스트 wrapper: max-w-0 -> 줄어들 수 있게, truncate 먹힘 */}
          <div className="truncate whitespace-nowrap overflow-hidden min-w-0">
            <span className="font-semibold">{alarm.content.split(":")[0]}</span>
          </div>
        </div>

        {/* 날짜 */}
        <span className="text-xs text-gray-400 ml-4 whitespace-nowrap">
          {/* 모바일용 (sm 미만) → 날짜만 */}
          <span className="block sm:hidden">
            {new Date(alarm.createdAt).toLocaleDateString("ko-KR")}
          </span>

          {/* 데스크탑용 (sm 이상) → 날짜 + 시간 */}
          <span className="hidden sm:block">
            {new Date(alarm.createdAt).toLocaleString("ko-KR")}
          </span>
        </span>
      </AccordionSummary>
      <AccordionDetails className="bg-gray-50 rounded-b-2xl">
        {alarm.type === "FRIEND" && alarm.sender && (
          <div className="flex items-center gap-2">
            <b>{alarm.sender.nickname}</b>님이 친구 요청을 보냈습니다!
          </div>
        )}

        {alarm.type === "STUDY" && (
          <div className="flex items-center gap-2">
            <b>{alarm.sender.nickname}</b>님이 스터디 참여를 승인했습니다!
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
      </AccordionDetails>
    </Accordion>
  );
}
