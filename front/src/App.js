import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "./recoil/userState";
import { Cookies } from "react-cookie";

import Meeting from "./page/Meeting";
import MeetingDetail from "./page/MeetingDetail";
import NotFoundPage from "./page/NotFoundPage";
import Brand from "./page/Brand";
import ToolkitDetail from "./page/ToolkitDetail";
import Root from "./page/Root";
import Toolkit from "./page/Toolkit";
import Search from "./page/Search";
import ApplyForm from "./page/ApplyForm";
import Auth from "./page/Auth";
import GoogleAuth from "./page/GoogleAuth";
import KakakoAuth from "./page/KakaoAuth";
import Mypage from "./page/Mypage";
import UserInfoModify from "./page/UserInfoModify";
import UserProfileModify from "./page/UserProfileModify";
import CommunityReviews from "./page/CommunityReviews";

function App() {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");

  const setUserIn = useSetRecoilState(userState);

  useEffect(() => {
    if (accessToken) {
      setUserIn(true);
    }
  }, [accessToken, setUserIn]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <NotFoundPage />,
      children: [
        { index: true, element: <Meeting /> },
        {
          path: "/meeting/detail/:id",
          element: <MeetingDetail />,
        },
        {
          path: "/communityReviews",
          element: <CommunityReviews />,
        },
        {
          path: "/applyForm",
          element: <ApplyForm />,
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
          path: "/googleAuth",
          element: <GoogleAuth />,
        },
        {
          path: "/kakaoAuth",
          element: <KakakoAuth />,
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
  return <RouterProvider router={router} />;
}

export default App;
