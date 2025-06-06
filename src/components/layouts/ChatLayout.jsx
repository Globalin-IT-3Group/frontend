import BaseLayout from "./BaseLayout";
import CommunitySidebar from "../navigation/CommunitySidebar";
import { Outlet } from "react-router-dom";

function ChatLayout() {
  return (
    <BaseLayout SidebarComponent={CommunitySidebar}>
      <Outlet />
    </BaseLayout>
  );
}

export default ChatLayout;
