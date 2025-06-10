import ChatHeader from "./ChatHeader";
import ChatMessageList from "./ChatMessageList";
import ChatInput from "./ChatInput";
import { useEffect, useState } from "react";
import chatMessageApi from "../../../api/chatMessageApi";
import useChatSocket from "../../../hooks/useChatSocket";
import { useSelector } from "react-redux";

export default function ChatRoom({ roomId, otherUser }) {
  const [initialMessages, setInitialMessages] = useState([]);
  const [input, setInput] = useState("");
  const userId = useSelector((state) => state.auth.id);
  const { messages, sendMessage } = useChatSocket(roomId);

  useEffect(() => {
    chatMessageApi.getMessagesByRoomId(roomId).then(setInitialMessages);
  }, [roomId]);

  const allMessages = [...initialMessages, ...messages];

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ChatHeader otherUser={otherUser} />
      <ChatMessageList messages={allMessages} userId={userId} />
      <ChatInput input={input} onChange={setInput} onSend={handleSend} />
    </div>
  );
}
