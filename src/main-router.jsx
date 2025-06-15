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
import StudyRecruitPage from "./routes/StudyRecruit/StudyRecruitPage";
import WordPage from "./routes/word/WordPage";
import CommunityPage from "./routes/community/CommunityPage";
import BoardForm from "./routes/community/BoardForm";
import BoardDetailPage from "./routes/community/BoardDetailPage";

const routers = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "my-info",
        element: <MyInfoPage />,
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
    path: "/kakao/login",
    element: <Redirect />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/find",
    element: <NoSidebarLayout />,
    children: [
      { index: true, element: <Navigate to="/find/email" replace /> },
      { path: "email", element: <FindAccountPage /> },
      { path: "password", element: <FindAccountPage /> },
    ],
  },
  {
    path: "/study",
    element: <MainLayout />,
    children: [{ path: "recruit", element: <StudyRecruitPage /> }],
  },
  {
    path: "/join",
    element: <NoSidebarLayout />,
    children: [{ index: true, element: <JoinPage /> }],
  },
  {
    path: "/word",
    element: <MainLayout />,
    children: [{ index: true, element: <WordPage /> }],
  },
  {
    path: "/community",
    element: <MainLayout />,
    children: [
      { index: true, element: <CommunityPage /> },
      { path: ":id", element: <BoardDetailPage /> }, // ← 상세 페이지 라우팅 추가!
      // 글쓰기 폼
      { path: "new", element: <BoardForm /> },
    ],
  },
  {
    path: "*",
    element: <NoSidebarLayout />,
    children: [
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routers);

export default router;
