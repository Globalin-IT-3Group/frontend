import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import MainPage from "./routes/main/MainPage";
import ChatLayout from "./components/layouts/ChatLayout";
import ChattingPage from "./routes/chat/ChattingPage";
import NotFoundPage from "./routes/error/NotFoundPage";
import NoSidebarLayout from "./components/layouts/NoSidebarLayout";
import Redirect from "./components/modal/Redirect";
import MyInfoPage from "./routes/main/MyInfoPage";

const routers = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
    ],
  },
  {
    path: "/chat",
    element: <ChatLayout />,
    children: [
      {
        index: true,
        element: <ChattingPage />,
      },
    ],
  },
  {
    path: "/my-info",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MyInfoPage />,
      },
    ],
  },

  {
    path: "/kakao/login",
    element: <Redirect />,
  },

  // 404 처리
  {
    path: "*",
    element: (
      <NoSidebarLayout>
        <NotFoundPage />
      </NoSidebarLayout>
    ),
  },
];

const router = createBrowserRouter(routers);

export default router;
