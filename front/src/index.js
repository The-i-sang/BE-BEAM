import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { RecoilRoot } from "recoil";
import { CookiesProvider } from "react-cookie";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Meeting from "./page/Meeting";
import MeetingDetail from "./page/MeetingDetail";
import NotFoundPage from "./page/NotFoundPage";
import Brand from "./page/Brand";
import ToolkitDetail from "./page/ToolkitDetail";
import Toolkit from "./page/Toolkit";
import Search from "./page/Search";
import Auth from "./page/Auth";
import Mypage from "./page/Mypage";
import UserInfoModify from "./page/UserInfoModify";
import UserProfileModify from "./page/UserProfileModify";
import CommunityReviews from "./page/CommunityReviews";
import CreateSmallGroup from "./page/CreateSmallGroup";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Meeting /> },
      {
        path: "/meeting/detail/:id",
        element: <MeetingDetail />,
      },
      {
        path: "/meeting/createSmallGroup",
        element: <CreateSmallGroup />,
      },
      {
        path: "/communityReviews",
        element: <CommunityReviews />,
      },
      {
        path: "/toolkit",
        element: <Toolkit />,
      },
      {
        path: "/toolkit/detail/:id",
        element: <ToolkitDetail />,
      },
      {
        path: "/brand",
        element: <Brand />,
      },
      { path: "/search", element: <Search /> },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/mypage",
        element: <Mypage />,
      },
      {
        path: "/mypage/userInfoModify",
        element: <UserInfoModify />,
      },
      {
        path: "/mypage/userProfileModify",
        element: <UserProfileModify />,
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

root.render(
  <RecoilRoot>
    <RouterProvider router={router}>
      <CookiesProvider />
    </RouterProvider>
  </RecoilRoot>
);

reportWebVitals();
