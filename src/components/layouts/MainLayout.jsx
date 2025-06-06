import BaseLayout from "./BaseLayout";
import BasicSidebar from "../navigation/BasicSidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <BaseLayout SidebarComponent={BasicSidebar}>
      <Outlet />
    </BaseLayout>
  );
}

export default MainLayout;
