import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";
import { useEffect, useState } from "react";
import chatMessageApi from "../../../api/chatMessageApi";
import useChatSocket from "../../../hooks/useChatSocket";
import { useSelector } from "react-redux";
import KotsuKotsuLoader from "../../../components/loadings/KotsuKotsuLoader";

export default function ChatRoom({ roomId, otherUser }) {
  const [initialMessages, setInitialMessages] = useState([]);
  const [input, setInput] = useState("");
  const userId = useSelector((state) => state.auth.id);
  const { messages, sendMessage } = useChatSocket(roomId);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    chatMessageApi
      .getMessagesByRoomId(roomId)
      .then((res) => {
        setInitialMessages(res);
        console.log("채팅 내역", res);
      })
      .finally(() => setLoading(false));
  }, [roomId]);

  const allMessages = [...initialMessages, ...messages];

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim());
      setInput("");
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
        rounded-2xl shadow-lg
        bg-white
        px-6 py-4 mt-7
        overflow-hidden              // 내부 컨텐츠 넘침 방지
      "
    >
      <ChatHeader otherUser={otherUser} />
      <ChatMessageList messages={allMessages} userId={userId} />
      <ChatInput input={input} onChange={setInput} onSend={handleSend} />
    </div>
  );
}
