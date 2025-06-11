import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import MainPage from "./routes/main/MainPage";
import ChatLayout from "./components/layouts/ChatLayout";
import ChattingPage from "./routes/chat/ChattingPage";
import NotFoundPage from "./routes/error/NotFoundPage";
import NoSidebarLayout from "./components/layouts/NoSidebarLayout";
import Redirect from "./components/Login/Redirect";
import MyInfoPage from "./routes/MyInfo/MyInfoPage";
import JoinPage from "./routes/Join/JoinPage";
import LoginPage from "./routes/Login/LoginPage";
import FindAccountPage from "./routes/findAccount/FindAccountPage";

const routers = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      { path: "my-info", element: <MyInfoPage /> },
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
    path: "/kakao/login",
    element: <Redirect />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/auth",
    element: <NoSidebarLayout />,
    children: [
      { path: "find", element: <Navigate to="/find/email" replace /> },
      { path: "find/email", element: <FindAccountPage /> },
      { path: "find/password", element: <FindAccountPage /> },
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
