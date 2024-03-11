import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NotFoundPage from "./page/NotFoundPage";
import Main from "./page/Main";
import Detail from "./page/Detail";
import Root from "./page/Root";
import Toolkit from "./page/Toolkit";
import Search from "./page/Search";
import ApplyForm from "./page/ApplyForm";
import Auth from "./page/Auth";
import Mypage from "./page/Mypage";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "./recoil/userState";
import UserInfoModify from "./page/UserInfoModify";
import UserProfileModify from "./page/UserProfileModify";
import Meeting from "./page/Meeting";
import MeetingDetail from "./component/MeetingDetail";
import GoogleAuth from "./page/GoogleAuth";
import { Cookies } from "react-cookie";
import KakakoAuth from "./page/KakaoAuth";
import Community from "./page/Community";

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
        { index: true, element: <Main /> },
        {
          path: "/meeting",
          element: <Meeting />,
        },
        {
          path: "/community",
          element: <Community />,
        },
        {
          path: "/meeting/detail/:id",
          element: <MeetingDetail />,
        },
        { path: "/search", element: <Search /> },
        {
          path: "/toolkit",
          element: <Toolkit />,
        },
        {
          path: "/toolkit/detail/:id",
          element: <Detail />,
        },
        { path: "*", element: <NotFoundPage /> },
        {
          path: "/applyForm",
          element: <ApplyForm />,
        },
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
        {
          path: "/googleAuth",
          element: <GoogleAuth />,
        },
        {
          path: "/kakaoAuth",
          element: <KakakoAuth />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
