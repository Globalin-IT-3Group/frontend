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
import MyStudyRoomPage from "./routes/MyStudyRoom/MyStudyRoomPage";
import InquiryPage from "./routes/inquiry/InquiryPage";
import MyNoteList from "./routes/MyNote/MyNoteList";
import MyNoteDetail from "./routes/MyNote/MyNoteDetail";
import MyNoteForm from "./routes/MyNote/MyNoteForm";
import MyNoteEdit from "./routes/MyNote/MyNoteEdit";
import AlarmPage from "./routes/alarm/AlarmPage";
import StudyRoomListModal from "./components/MyStudyRoom/StudyRoomListModal";
import LandingPage from "./routes/landing/LandingPage";
import StudyNoteDetail from "./routes/MyStudyRoom/StudyNoteDetail";
import StudyNoteForm from "./routes/MyStudyRoom/StudyNoteForm";
import VideoRoomPreviewPage from "./routes/video/VideoRoomPreviewPage";
import VideoRoomMeetingPage from "./routes/video/VideoRoomMeetingPage";

const routers = [
  { path: "/", element: <LandingPage /> },
  {
    path: "/main",
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
      {
        path: "inquiry",
        element: <InquiryPage />,
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
    path: "/note",
    element: <MainLayout />,
    children: [
      { index: true, element: <MyNoteList /> },
      { path: "new", element: <MyNoteForm mode="create" /> },
      { path: ":id", element: <MyNoteDetail /> },
      { path: ":id/edit", element: <MyNoteEdit /> },
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
    children: [
      { path: "recruit", element: <StudyRecruitPage /> },
      {
        path: "mystudyroom/:studyRoomId",
        element: <MyStudyRoomPage />,
      },
      {
        path: "mystudyroom/:studyRoomId/notes/new",
        element: <StudyNoteForm />,
      },
      {
        path: "mystudyroom/:studyRoomId/notes/:noteId/edit",
        element: <StudyNoteForm />,
      },
      {
        path: "mystudyroom/:studyRoomId/notes/:noteId",
        element: <StudyNoteDetail />,
      },
      // ...기타
    ],
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
      { path: ":boardId", element: <BoardDetailPage /> }, // ← 상세 페이지 라우팅 추가!
      // 글쓰기 폼
      { path: "write", element: <BoardForm /> },
    ],
  },
  {
    path: "/alarm",
    element: <MainLayout />,
    children: [{ index: true, element: <AlarmPage /> }],
  },
  {
    path: "/video-room",
    element: <NoSidebarLayout />,
    children: [
      {
        path: "preview/:studyRoomId",
        element: <VideoRoomPreviewPage />,
      },
      {
        path: "meeting/:studyRoomId",
        element: <VideoRoomMeetingPage />,
      },
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
