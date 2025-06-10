import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import MainPage from "./routes/main/MainPage";
import ChatLayout from "./components/layouts/ChatLayout";
import ChattingPage from "./routes/chat/ChattingPage";
import NotFoundPage from "./routes/error/NotFoundPage";
import NoSidebarLayout from "./components/layouts/NoSidebarLayout";
import Redirect from "./components/Login/Redirect";
import MyInfoPage from "./components/MyInfo/MyInfoPage";
import FindEmailPage from "./components/findAccount/FindEmailPage";
import FindEmailSuccess from "./components/findAccount/FindEmaillSuccess";
import FindPasswordPage from "./components/findAccount/FindPasswordPage";
import JoinPage from "./components/Join/JoinPage";

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

  {
    path: "/",
    element: <NoSidebarLayout />,
    children: [
      { path: "find/email", element: <FindEmailPage /> },
      { path: "find/password", element: <FindPasswordPage /> },
      { path: "find/email/success", element: <FindEmailSuccess /> },
      { path: "join", element: <JoinPage /> },
    ],
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
