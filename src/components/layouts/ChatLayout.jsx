import BaseLayout from "./BaseLayout";
import ChatSidebar from "../navigation/ChatSidebar";
import { Outlet } from "react-router-dom";

function ChatLayout() {
  return (
    <BaseLayout SidebarComponent={ChatSidebar}>
      <Outlet />
    </BaseLayout>
  );
}

export default ChatLayout;
