import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import MainPage from "./routes/main/MainPage";

const routers = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <MainPage />,
        index: true,
      },
    ],
  },
];

const router = createBrowserRouter(routers);

export default router;
