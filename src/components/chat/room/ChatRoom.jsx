import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";
import { useEffect, useState } from "react";
import chatMessageApi from "../../../api/chatMessageAPI";
import useChatSocket from "../../../hooks/useChatSocket";
import { useSelector } from "react-redux";
import KotsuKotsuLoader from "../../../components/loadings/KotsuKotsuLoader";
import { useOutletContext } from "react-router-dom";

export default function ChatRoom({ roomId, otherUser }) {
  const [initialMessages, setInitialMessages] = useState([]);
  const [input, setInput] = useState("");
  const userId = useSelector((state) => state.auth.id);
  const { messages, sendMessage } = useChatSocket(roomId);
  const [loading, setLoading] = useState(true);
  const { refreshRooms } = useOutletContext();

  useEffect(() => {
    setLoading(true);
    setInput("");
    chatMessageApi
      .getMessagesByRoomId(roomId)
      .then((res) => {
        setInitialMessages(res);
      })
      .finally(() => setLoading(false));
  }, [roomId]);

  const allMessages = [...initialMessages, ...messages];

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim());
      setInput("");
      if (typeof refreshRooms === "function") refreshRooms();
    }
  };

  if (loading) return <KotsuKotsuLoader />;

  return (
    <div
      className="     
        flex flex-col
        min-w-[360px] max-w-[600px]  // 최소, 최대 너비
        min-h-[750px] max-h-[750px]  // 최소, 최대 높이
        w-full h-full                // 필요시 부모 기준 100%
        rounded-2xl 
        shadow-[0_0_6px_rgba(0,0,0,0.1)]
        bg-white
        px-6 py-4
        dark:bg-zinc-800
        overflow-hidden              // 내부 컨텐츠 넘침 방지
      "
    >
      <ChatHeader otherUser={otherUser} />
      <ChatMessageList messages={allMessages} userId={userId} />
      <ChatInput input={input} onChange={setInput} onSend={handleSend} />
    </div>
  );
}
